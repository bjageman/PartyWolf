from flask_socketio import SocketIO, emit, join_room, leave_room, \
    close_room, rooms, disconnect
from flask import Flask, abort, request, jsonify, make_response, session
from flask_jwt import jwt_required, current_identity

from . import chat
from apps.users.models import User
from apps.database import *

from apps import socketio


@socketio.on('chat_send', namespace='/chat')
def test_message(message):
    print(message['data'])
    emit('chat_response',
         {'data': message['data']})
