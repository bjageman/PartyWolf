from flask_socketio import SocketIO, emit, send, join_room, leave_room, \
    close_room, rooms, disconnect
from flask import Flask

from random import shuffle, SystemRandom
from collections import Counter
import string

from . import games
from apps.games.models import Game, Player, Role, History
from apps.users.models import User
from apps.parsers import *
from apps.database import *

from apps import socketio, db

def randomCode(size=10):
    return ''.join(SystemRandom().choice(string.ascii_uppercase + string.digits) for _ in range(10))

def create_deck(deck_size):
    print("Creating Deck", deck_size)
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
    print("CONNECTED")
    send('connected')


@socketio.on('games_test')
def test_game(data):
    emit('games_success',
         {'data': data['data']})

@socketio.on('get_games')
def get_games(data):
    games = Game.query.filter_by(public=True).filter(Game.closed != True).all()
    print(games)
    emit('get_games_success',{
        "games": parse_games(games),
    })


@socketio.on('create_game')
def create_game(data):
    print("DEBUG: CREATE GAME")
    user_id = data['user_id']
    creator = User.query.get(user_id)
    public = True
    if 'public' in data:
        public = data['public']
    print(public)
    game = Game(code=randomCode(), creator=creator, public=public)
    db.session.add(game)
    create_player(game, creator)
    join_room(game.code)
    print("DEBUG: ALL GOOD")
    emit('create_game_success',{
        "game": parse_game(game),
    }, room=game.code) #Won't need this for create_game

@socketio.on('add_player')
def add_player(data):
    print("ADDING PLAYER")
    game = Game.query.get(data['game_id'])
    user = User.query.get(data['user_id'])
    print("JOINING ROOM")
    join_room(game.code)
    print("CREATING PLAYER")
    create_player(game, user)
    print("ALL DONE")
    emit('add_player_success',{
         "game": parse_game(game),
         }, room=game.code)

@socketio.on('assign_roles')
def assign_roles(data):
    print("ASSIGN ROLES")
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
    game = voter.game
    join_room(game.code)
    if voter.alive:
        choice = Player.query.get(data['choice_id'])
        if choice.alive:
            voter.current_vote = choice
            db.session.add(voter)
            db.session.commit()
    villager_vote = None
    if len(get_votes_left(game.players)) == 0:
        villager_vote = get_villager_vote(game.players)
        if villager_vote is not None:
            result = handle_turn(game, villager_vote)
            if result == "NEXT_TURN":
                emit('vote_final',
                     {
                     "result": parse_player(villager_vote),
                     }, room=game.code)
            if result == "Werewolves" or result == "Villagers":
                emit('game_final',
                     {
                     "result": result,
                     }, room=game.code)
    emit('vote_success',
         {
         "game": parse_game(game),
         "votes_result": parse_player(villager_vote),
         }, room=game.code)

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
    for player in game.players:
        player.current_vote = None
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


def get_votes_left(players):
    living_voting_players_left = players.filter_by(alive=True).filter_by(current_vote = None).all()
    return living_voting_players_left

@socketio.on_error()        # Handles the default namespace
def error_handler(e):
    emit('error', {'error': e})
