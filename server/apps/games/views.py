from flask_socketio import SocketIO, emit, send, join_room, leave_room, \
    close_room, rooms, disconnect
from flask import Flask, abort, request, jsonify, make_response, session
from flask_jwt import jwt_required, current_identity

from . import games
from apps.users.models import User
from apps.database import *

from apps import socketio

@socketio.on('connect', namespace='/games')
def on_connect():
    print("games connect")
    send('connected')


@socketio.on('games_test', namespace='/games')
def test_message(message):
    emit('games_response',
         {'data': message['data']})
