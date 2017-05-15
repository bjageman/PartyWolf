from flask_socketio import SocketIO, emit, send, join_room, leave_room, \
    close_room, rooms, disconnect
from flask import Flask, abort, request, jsonify, make_response, session
from flask_jwt import jwt_required, current_identity

from random import shuffle, SystemRandom
import string

from . import games
from apps.games.models import Game, Player, Role, History
from apps.users.models import User
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

def parse_user(user):
    return ({
        "id": user.id,
        "username": user.username
    })

def parse_game(game):
    return ({
        "id": game.id,
        "code": game.code,
        "public": game.public,
        "creator": parse_user(game.creator),
        "players": parse_players(game.players)
    })

def parse_player(player):
    if player.role is not None:
        role = player.role.name
    else:
        role = None
    return ({
        "id": player.id,
        "user": parse_user(player.user),
        "role": role
    })

def parse_players(players):
    parsedPlayers = []
    for player in players:
        parsedPlayers.append(parse_player(player))
    return parsedPlayers

def createPlayer(game, user):
    new_player = Player(game=game, user=user)
    db.session.add(new_player)
    db.session.commit()
    return new_player

@socketio.on('connect', namespace='/games')
def on_connect():
    send('connected')

@socketio.on('games_test', namespace='/games')
def test_game(data):
    emit('games_response',
         {'data': data['data']})

@socketio.on('create_game', namespace='/games')
def create_game(data):
    user_id = data['user_id']
    creator = User.query.get(user_id)
    public = True
    if 'public' in data:
        public = data['public']
    game = Game(code=randomCode(), creator=creator, public=public)
    db.session.add(game)
    createPlayer(game, creator)
    emit('create_game_response',{
        "game": parse_game(game),
    })

@socketio.on('add_player', namespace='/games')
def add_player(data):
    game = Game.query.get(data['game_id'])
    user = User.query.get(data['user_id'])
    createPlayer(game, user)
    emit('add_player_response',{
         'players': parse_players(game.players)
         })

@socketio.on('assign_roles', namespace='/games')
def assign_roles(data):
    game = Game.query.get(data['game_id'])
    size = len(game.players.all())
    deck = create_deck(size)
    for player in game.players:
        player.role = deck.pop()
    emit('assign_roles_response',
         {
         'players': parse_players(game.players)
         })

@socketio.on('make_vote', namespace='/games')
def set_vote(data):
    voter = Player.query.get(data['voter_id'])
    choice = Player.query.get(data['choice_id'])
    voter.current_vote = choice
    db.session.commit()
    emit('vote_response',
         {
         'choice_username': choice.user.username,
         'choice_id': choice.id,
         'voter_id': voter.id,
         'voter_username': voter.user.username,
         })
