from flask_socketio import SocketIO, emit, send, join_room, leave_room, \
    close_room, rooms, disconnect
from flask import Flask

from random import shuffle, SystemRandom
from collections import Counter
import string

from . import games
from apps.games.models import Game, Player, Role, Vote
from apps.users.models import User
from apps.parsers import *
from apps.database import *

from apps import socketio, db

def randomCode(size=10):
    return ''.join(SystemRandom().choice(string.ascii_uppercase + string.digits) for _ in range(10))

def create_deck(deck_size):
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

@socketio.on('connect')
def on_connect():
    send('connected')


@socketio.on('games_test')
def test_game(data):
    emit('games_success',
         {'data': data['data']})

@socketio.on('get_games')
def get_games(data):
    games = Game.query.filter_by(public=True).filter(Game.closed != True).all()
    emit('get_games_success',{
        "games": parse_games(games),
    })


@socketio.on('create_game')
def create_game(data):
    user_id = data['user_id']
    creator = User.query.get(user_id)
    if creator is not None:
        public = True
        if 'public' in data:
            public = data['public']
        game = Game(code=randomCode(), creator=creator, public=public)
        db.session.add(game)
        create_player(game, creator)
        join_room(game.code)
        emit('create_game_success',{
            "game": parse_game(game),
        }, room=game.code) #Won't need this for create_game

@socketio.on('add_player')
def add_player(data):
    game = Game.query.get(data['game_id'])
    user = User.query.get(data['user_id'])
    if game is not None and user is not None:
        join_room(game.code)
        create_player(game, user)
        emit('join_game_success',{
             "game": parse_game(game),
             })
        emit('add_player_success',{
             "game": parse_game(game),
             }, room=game.code)

@socketio.on('assign_roles')
def assign_roles(data):
    game = Game.query.get(data['game_id'])
    join_room(game.code)
    size = len(game.players.all())
    deck = create_deck(size)
    for player in game.players:
        player.role = deck.pop()
        db.session.add(player)
    db.session.commit()
    emit('assign_roles_success',
         {
         "game": parse_game(game),
         }, room=game.code)

@socketio.on('set_vote')
def set_vote(data):
    voter = Player.query.get(data['voter_id'])
    choice = Player.query.get(data['choice_id'])
    try:
        role = Role.query.get(data['role_id'])
    except KeyError:
        role = None
    game = voter.game
    turn = 1 #data['turn']
    results = {}
    if verify_vote(voter, choice, turn, role):
        save_vote(voter, choice, turn, role)
        join_room(voter.game.code)
        emit('vote_success',
            {
            "game": parse_game(game),
            }, room=game.code)
        if verify_everyone_voted(game, turn):
            votes = game.votes.filter_by(turn = turn)
            vote_roles = []
            for vote in votes.all():
                if vote.role is not None:
                    vote_roles.append(vote.role)
            roles = Role.query.all()
            living_roles = [role for role in roles if role in vote_roles]
            for role in living_roles:
                result = get_vote_result(votes, turn, role)
                if result is not None:
                    results[role.name] = parse_player(result)
            result = get_vote_result(votes, turn)
            if result is not None:
                results['default'] = parse_player(result)
            if len(results) == (len(living_roles) + 1):
                print("Emit final")
                emit('vote_final',
                    {
                    "results": results,
                    }, room=game.code)

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
                    return False
            else:
                return True
    return False

def save_vote(voter, choice, turn, role = None):
    game = voter.game
    if role is None:
        vote = Vote.query.filter_by(voter=voter).filter_by(turn=turn).first()
    else:
        vote = Vote.query.filter_by(voter=voter).filter_by(turn=turn).filter_by(role=role).first()
    if vote is None:
        role_name = None
        if role is not None:
            role_name = role.name
        vote = Vote(turn=turn, choice=choice, voter=voter, game=game, role=role)
    else:
        vote.choice=choice
    db.session.add(vote)
    db.session.commit()

## Counts up the votes and returns True if all votes are tallied
def verify_everyone_voted(game, turn):
    living_players = game.players.filter(Player.alive == True)
    living_players_special = living_players.join(Role).filter(Role.name != "Villager")
    player_votes_count = len(living_players.all()) + len(living_players_special.all())
    votes = game.votes.filter_by(turn = turn).all()
    if player_votes_count == len(votes):
        return 1
    elif player_votes_count < len(votes):
        return 2 #Something went wrong
    else:
        return 0


def handle_turn(game, villager_vote, ww_vote = None):
    villager_vote.alive = False
    db.session.add(villager_vote)
    bad_guys = game.players.filter_by(alive=True).join(Role).filter(Role.evil == True).all()
    good_guys = game.players.filter_by(alive=True).join(Role).filter(Role.evil == False).all()
    print(len(good_guys), len(bad_guys))
    if len(bad_guys) == 0:
        return "Villagers"
    if len(bad_guys) >= len(good_guys):
        return "Werewolves"
    # for player in game.players:
    #     player.current_vote = None
        db.session.add(player)
    db.session.commit()
    return "NEXT_TURN"

def get_villager_vote(players):
    vote_count = []
    living_players_voted = players.filter_by(alive=True).filter(Player.current_vote != None).all()
    for player in living_players_voted:
        vote_count.append(player.current_vote)
    tally = Counter(vote_count).most_common(2)
    if len(tally) < 2 or tally[0][1] > tally[1][1]:
        return tally[0][0]
    else:
        return None
    return living_players_voted

@socketio.on_error()        # Handles the default namespace
def error_handler(e):
    emit('error', {'error': e})
