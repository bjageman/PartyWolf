from flask_socketio import SocketIO, emit, send, join_room, leave_room, \
    close_room, rooms, disconnect
from flask import Flask, request, make_response, jsonify, abort

from random import shuffle, SystemRandom
import string

from . import users

from apps.users.models import User, authenticate
from apps.database import *

from apps import socketio, db
from apps.games.models import Game

from apps.parsers import parse_user, parse_player

def get_users_player(user, game):
    for player in game.players:
        if player.user.id == user.id:
            return player

@socketio.on('get_user')
def get_user(data):
    user = User.query.get(data['user_id'])
    player = None
    if 'game_id' in data:
        game = Game.query.get(data['game_id'])
        player = get_users_player(user, game)
    print(player)
    if user is not None:
        emit('get_user_success',{
            "user": parse_user(user, player),
        })
    else:
        emit('get_user_fail',{
            "error": None,
        })


@socketio.on('login')
def login(data):
    username = data['username']
    password = data['password']
    user = authenticate(username, password)
    print(user)
    if user is not None:
        emit('user_login_success',{
            "user": parse_user(user),
        })
    else:
        emit('user_login_fail',{
            "error": None,
        })

@users.route('', methods=['POST'])
def register_user():
    try:
        data = request.get_json()
        username = data['username']
        password = data['password']
    except (AttributeError, KeyError):
        abort(400)
    if User.query.filter_by(username = username).first() is not None:
        abort(400)
    user = User(username = username)
    user.hash_password(password)
    db.session.add(user)
    db.session.commit()
    return jsonify({ 'username': user.username })

#Todo: Transfer to separate file

@users.errorhandler(404)
def not_found(error):
    return make_response(jsonify({'error': 'Not found'}), 404)

@users.errorhandler(401)
def unauthorized(error):
    return make_response(jsonify({'error': 'Unauthorized access'}), 401)

@users.errorhandler(400)
def bad_request(error):
    return make_response(jsonify({'error': 'Bad Request'}), 400)
