from flask_socketio import SocketIO, emit, send, join_room, leave_room, \
    close_room, rooms, disconnect
from flask import Flask

from random import shuffle, SystemRandom
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

@socketio.on('create_game')
def create_game(data):
    print("DEBUG: CREATE GAME")
    user_id = data['user_id']
    creator = User.query.get(user_id)
    public = True
    if 'public' in data:
        public = data['public']
    game = Game(code=randomCode(), creator=creator, public=public)
    db.session.add(game)
    create_player(game, creator)
    join_room(game.code)
    print("DEBUG: ALL GOOD")
    emit('create_game_success',{
        "game": parse_game(game),
    }, room=game.code)

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
    size = len(game.players.all())
    deck = create_deck(size)
    for player in game.players:
        player.role = deck.pop()
        db.session.add(player)
    db.session.commit()
    emit('assign_roles_success',
         {
         "game": parse_game(game),
         })

@socketio.on('make_vote')
def set_vote(data):
    voter = Player.query.get(data['voter_id'])
    choice = Player.query.get(data['choice_id'])
    voter.current_vote = choice
    db.session.commit()
    emit('vote_success',
         {
         "game": parse_game(game),
         })

@socketio.on_error()        # Handles the default namespace
def error_handler(e):
    emit('error', {'error': e})
