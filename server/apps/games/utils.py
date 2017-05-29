from apps.games.models import Game, Player, Role, Vote
from apps.users.models import User
from apps.parsers import *
from apps.database import *

from random import shuffle, SystemRandom
from collections import Counter
import string

def randomCode(size=10):
    return ''.join(SystemRandom().choice(string.ascii_uppercase + string.digits) for _ in range(10))

def create_deck(deck_size):
    if deck_size < 6:
        num_ww = 1
    else:
        num_ww = 2
    villager = Role.query.filter_by(name="Villager").first()
    werewolf = Role.query.filter_by(name="Werewolf").first()
    seer = Role.query.filter_by(name="Seer").first()
    deck = [villager] * (deck_size - 3) + [werewolf] * 2 + [seer] * 1
    shuffle(deck)
    return deck

def create_player(game, user):
    new_player = Player(game=game, user=user)
    db.session.add(new_player)
    db.session.commit()
    return new_player

def determine_winner(game):
    living_players = game.players.filter_by(alive=True)
    evil_players = living_players.join(Role).filter(Role.evil == True).all()
    good_players = living_players.join(Role).filter(Role.evil == False).all()
    if len(good_players) <= len(evil_players):
        game.winner = "evil"
        db.session.add(game)
        return "evil"
    if len(evil_players) == 0:
        game.winner = "good"
        db.session.add(game)
        return "good"
    return None

def set_next_turn(game):
    print("Going to next turn")
    game.current_turn = game.current_turn + 1
    db.session.add(game)
    db.session.commit()
    return True

def kill_player(player):
    print("Killing",player['id'])
    player = Player.query.get(player['id'])
    player.alive = False
    db.session.add(player)
    db.session.commit()
    return True

def tally_all_votes(game, turn):
    results = {}
    votes = game.votes.filter_by(turn = turn)
    vote_roles = []
    for vote in votes.all():
        if vote.role is not None:
            vote_roles.append(vote.role.id)
    roles = Role.query.all()
    living_roles = [role for role in roles if role.id in vote_roles]
    for role in living_roles:
        result = get_vote_result(votes, turn, role)
        if result is not None:
            results[role.name] = parse_player(result)
    result = get_vote_result(votes, turn)
    if result is not None:
        results['default'] = parse_player(result)
    return results, len(living_roles) + 1

def vote_objects_to_ids(votes):
    results = []
    for vote in votes:
        results.append(vote.choice.id)
    return results

def get_vote_result(votes, turn, role=None):
    result = vote_objects_to_ids(votes.filter(Vote.role == role).all())
    tally = Counter(result).most_common(2)
    #Ensure that a tie is not made
    if len(tally) < 2 or tally[0][1] > tally[1][1]:
        choice = Player.query.get(tally[0][0])
        return choice
    else:
        return None

def verify_vote(voter, choice, turn, role = None):
    game = voter.game
    if voter.alive:
        if choice.alive:
            if role is not None:
                if voter.role == role:
                    return True
                else:
                    print("Roles don't match", voter.role.name)
                    return False
            else:
                return True
    return False

def save_vote(voter, choice, turn, role = None):
    game = voter.game
    vote = Vote.query.filter_by(voter=voter).filter_by(turn=turn).filter_by(role=role).first()
    if vote is None:
        vote = Vote(turn=turn, choice=choice, voter=voter, game=game, role=role)
    else:
        vote.choice=choice
    print("Voter:", vote.voter.id, "Choice: ", vote.choice.id, "Role: ", role)
    db.session.add(vote)
    db.session.commit()

## Counts up the votes and returns True if all votes are tallied
def verify_everyone_voted(game, turn):
    print("Did Everyone vote?")
    living_players = game.players.filter(Player.alive == True)
    living_players_special = living_players.join(Role).filter(Role.name != "Villager")
    player_votes_count = len(living_players.all()) + len(living_players_special.all())
    votes = game.votes.filter_by(turn = turn).all()
    if player_votes_count == len(votes):
        print("Yes")
        return 1
    elif player_votes_count < len(votes):
        print("Something went wrong")
        return 2 #Something went wrong
    else:
        print("No")
        return 0
