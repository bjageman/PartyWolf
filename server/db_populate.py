import sys

from apps import app, db, socketio
from apps.users.models import User
from apps.games.models import Game, Player, Role, History

from apps.config import DATABASE

from socketIO_client import SocketIO

current_id = 0

roles = [{"name":"Werewolf", "team":"W"}, {"name":"Villager", "team":"V"}, {"name":"Seer", "team":"V"}]

def on_register_response(*args):
    print('on_register_response', args)
    if len(args) > 0:
        print(args[0])
        if 'user' in args[0]:
            current_id = args[0]['user']['id']
            print("current_id", current_id)
            socketIO.emit('add_player', {
                "game_id": 9,
                "user_id": current_id,
                })
    #print(args['error'])

def create_role_models():
    for i in roles:
        role = Role(name=i['name'], team=i['team'])
        db.session.add(role)
    db.session.commit()

def on_add_player_response(*args):
    print('on_add_player_response', args)

def on_disconnect():
    print('disconnect')

def on_connect():
    print('connect')

if __name__ == '__main__':
    if len(sys.argv) < 2:
        exit(1)
    game_id = sys.argv[1]
    app.config['SQLALCHEMY_DATABASE_URI'] = DATABASE
    with SocketIO('localhost', 5000) as socketIO:
        socketIO.on('connect', on_connect)
        # socketIO.on('user_registration_success', on_register_response)
        # socketIO.on('user_registration_fail', on_register_response)
        socketIO.on('add_player_success', on_add_player_response)
        # socketIO.emit('register', {
        #          "username": "testUserD",
        #          "password": "pass",
        #          }, on_register_response)
        # # for i in range(10):
        # #     socketIO.emit('register', {
        # #         "username": "testUserA" + str(i),
        # #         "password": "pass",
        # #         }, on_register_response)
        # print("current_id global", current_id)
        for i in range(10):
            socketIO.emit('add_player', {
                "game_id": str(game_id),
                "user_id": str(i + 5),
                }, on_add_player_response)
            socketIO.wait(seconds=1)
            socketIO.on('disconnect', on_disconnect)
