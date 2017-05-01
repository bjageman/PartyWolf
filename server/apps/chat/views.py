from flask_socketio import SocketIO, emit, join_room, leave_room, \
    close_room, rooms, disconnect
from flask import Flask, abort, request, jsonify, make_response, session
from flask_jwt import jwt_required, current_identity

from . import chat
from apps.users.models import User
from apps.database import *

from apps import socketio

@socketio.on('connect', namespace='/chat')
def on_connect():
    send('connected')

@socketio.on('chat_send', namespace='/chat')
def test_message(message):
    print(message)
    emit('chat_response',
         {'data': message})

@socketio.on_error()
def error_handler(value):
    if isinstance(value, AssertionError):
        global error_testing
        error_testing = True
    else:
        raise value
    return value


@socketio.on('error testing')
def raise_error(data):
    raise AssertionError()


@socketio.on_error('/chat')
def error_handler_namespace(value):
    if isinstance(value, AssertionError):
        global error_testing_namespace
        error_testing_namespace = True
    else:
        raise value
    return value


@socketio.on("error testing", namespace='/chat')
def raise_error_namespace(data):
    raise AssertionError()
