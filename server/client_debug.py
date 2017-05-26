import sys
import requests, json
from optparse import OptionParser

from apps import app, db, socketio
from apps.users.models import User
from apps.games.models import Game, Player, Role, Vote

from apps.config import DATABASE

from socketIO_client import SocketIO

current_id = 0

roles = [
    {"name":"Werewolf", "avatar": "https://placekitten.com/g/300/400", "evil":True},
    {"name":"Villager", "avatar": "http://www.smashbros.com/images/og/murabito.jpg", "evil":False},
    {"name":"Seer", "avatar": "https://legendsofwindemere.files.wordpress.com/2014/02/the_fortune_teller_by_jerry8448-d378fed.jpg", "evil":False}
]

parser = OptionParser()
parser.add_option("-g", "--game", dest="game", type="int",
                  help="set the game id for various functions", metavar="GAME_ID")
parser.add_option("-j", "--join-user", dest="join_user", type="int",
                  help="have a new user join the game", metavar="USER_ID")
parser.add_option('--setup', dest="setup", default = False, action = 'store_true',
                  help="Runs the initial DB setup")
parser.add_option("--set", dest="add_set", type="int",
                  help="Adds X extra people after first user (requires --join-user)", metavar="NUM_PLAYERS")
parser.add_option("-p", "--player", dest="player_id", type="int",
                  help="set the current player", metavar="PLAYER_ID")
parser.add_option("--role", dest="role_id", type="int",
                  help="set a special role (e.g. werewolf, seer) by ID", metavar="ROLE_ID")
parser.add_option("-r", "--register-user", dest="register_user",
                  help="creates a new user with the password 'password'", metavar="USERNAME")
parser.add_option("-u", "--user", dest="user_id", type="int",
                  help="set the current user", metavar="USER_ID")
parser.add_option("-v", "--vote", dest="vote_id", type="int",
                  help="sets a vote on a specified player ID (requires --player)", metavar="PLAYER_ID")


def on_register_response(*args):
    print('on_register_response', args)

def create_role_models():
    for i in roles:
        role = Role(name=i['name'], team=i['team'])
        db.session.add(role)
    db.session.commit()

def on_add_player_response(*args):
    print('on_add_player_response', args)

def on_vote_success(*args):
    print('on_vote_success', args)


def on_disconnect():
    print('disconnect')

def on_connect():
    print('connect')

def registerPlayer(username, password = "password"):
    payload = {'username':username, 'password': password}
    r = requests.post('http://localhost:5000/users', json=payload)
    print(r.text)

def joinUser(game_id, user_id):
    socketIO.on('add_player_success', on_add_player_response)
    socketIO.emit('add_player', {
        "game_id": str(game_id),
        "user_id": str(user_id),
        }, on_add_player_response)

def votePlayer(voter_id, choice_id, role_id = None):
    socketIO.on('vote_success', on_vote_success)
    if role_id is None:
        socketIO.emit('set_vote', {
            "voter_id": voter_id,
            "choice_id": choice_id,
        })
    else:
        socketIO.emit('set_vote', {
            "voter_id": voter_id,
            "choice_id": choice_id,
            "role_id": role_id,
        })


if __name__ == '__main__':
    app.config['SQLALCHEMY_DATABASE_URI'] = DATABASE
    #Initialize flags
    (options, args) = parser.parse_args()
    game_id = options.game
    user_id = options.user_id
    join_user = options.join_user
    add_set = options.add_set
    register_user = options.register_user
    vote_id = options.vote_id
    player_id = options.player_id
    role_id = options.role_id
    if options.setup:
        print("Creating Database...")
        db.create_all()
        print("Database Created")
        print("Creating Roles...")
        for role in roles:
            new_role = Role(name=role['name'], avatar=role['avatar'], evil=role['evil'])
            db.session.add(new_role)
        db.session.commit()
        print(len(roles), "roles successfully created")

    #Run socket commands
    with SocketIO('localhost', 5000) as socketIO:
        socketIO.on('connect', on_connect)
        if register_user is not None:
            registerPlayer(register_user)
        if game_id is not None:
            if join_user is not None:
                joinUser(game_id, join_user)
                if add_set is not None:
                    for i in range(add_set - 1):
                        joinUser(game_id, join_user + 1 + i)
        if player_id is not None:
            if vote_id is not None:
                votePlayer(player_id, vote_id, role_id)
                if add_set is not None:
                    for i in range(add_set - 1):
                        votePlayer(player_id + 1 + i, vote_id, role_id)

        socketIO.wait(seconds=1)
        socketIO.on('disconnect', on_disconnect)
