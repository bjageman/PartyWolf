from flask import Flask
from flask_jwt import JWT
from flask_sqlalchemy import SQLAlchemy
from flask_socketio import SocketIO
from datetime import timedelta

import apps.config
from . import config

app = Flask(__name__)
app.debug = True
app.config['SECRET_KEY'] = '%4n_hr3v9ue#j4$77!&q&o$@%c7stpvo_*bd)1ih2!n6)ytt^t'
app.config['SQLALCHEMY_DATABASE_URI'] = config.DATABASE
app.config['SQLALCHEMY_COMMIT_ON_TEARDOWN'] = True
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

app.config['JWT_EXPIRATION_DELTA'] = timedelta(hours=24)

db = SQLAlchemy(app)
db.init_app(app)
#Web Socket
async_mode = None
socketio = SocketIO(app, async_mode=async_mode)

from .database import *
from .users import users
from .chat import chat
from .games import games

#JWT System

jwt = JWT(app,authenticate, identity)

app.register_blueprint(chat, url_prefix='/chat')
app.register_blueprint(users, url_prefix='/users')
app.register_blueprint(games, url_prefix='/games')

@app.after_request
def add_headers(response):
    response.headers.add('Access-Control-Allow-Origin', '*')
    response.headers.add('Access-Control-Allow-Headers', 'Content-Type,Authorization')
    return response
