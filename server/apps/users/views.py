from flask_socketio import SocketIO, emit, send, join_room, leave_room, \
    close_room, rooms, disconnect
from flask import Flask

from random import shuffle, SystemRandom
import string

from apps.users.models import User, authenticate
from apps.database import *

from apps import socketio, db

def parse_user(user):
    return ({
        "id": user.id,
        "username": user.username
    })

@socketio.on('login')
def login(data):
    username = data['username']
    password = data['password']
    user = authenticate(username, password)
    if user is not None:
        print("LOGIN PASS")
        emit('user_login_success',{
            "user": parse_user(user),
        })
    else:
        emit('user_login_fail',{
            "error": None,
        })

@socketio.on('register')
def register(data):
    print("REGISTERING")
    username = data['username']
    password = data['password']
    if User.query.filter_by(username = username).first() is None:
        user = User(username = username)
        user.hash_password(password)
        db.session.add(user)
        db.session.commit()
        print("Registration success!")
        emit('user_registration_success',{
            "user": parse_user(user),
        })
    else:
        emit('user_registration_fail',{
            "error": None,
        })
