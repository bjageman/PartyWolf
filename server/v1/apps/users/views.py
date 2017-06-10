from flask_socketio import SocketIO, emit, send, join_room, leave_room, \
    close_room, rooms, disconnect
from flask import Flask, request, make_response, jsonify, abort

from random import shuffle, SystemRandom
import string

from . import users

from .models import User, authenticate
from ..database import *

from v1.apps import socketio, db
from v1.apps.games.models import Game

from v1.apps.parsers import parse_user, parse_player

#Error handling
from v1.apps.errors import *
from .errors import *

def get_users_player(user, game):
    for player in game.players:
        if player.user.id == user.id:
            return player

@socketio.on('login')
def login(data):
    try:
        username = data['username']
        password = data['password']
    except (AttributeError, KeyError):
        emit_error("Bad Request")
    user = authenticate(username, password)
    print("USER:", user)
    if user is not None:
        emit('user_login_success',{
            "user": parse_user(user),
        })
    else:
        emit_error("Incorrect Username/Password")

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
