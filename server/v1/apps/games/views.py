from flask_socketio import emit, send, join_room, leave_room, \
    close_room, rooms, disconnect
from flask import Flask

from collections import Counter

from . import games
from v1.apps.games.models import Game, Player, Role, Vote
from v1.apps.users.models import User
from v1.apps.parsers import *
from v1.apps.database import *

from v1.apps import socketio, db

from .utils import *

from v1.apps.errors import *

def send_game_update(game, data = {}):
    data['game'] = parse_game(game)
    print(data)
    emit('game_updated', data, room=game.code)

@socketio.on('connect')
def on_connect():
    send('connected')


@socketio.on('games_test')
def test_game(data):
    emit('games_success',
         {'data': data['data']})

@socketio.on('get_games')
def get_games(data):
    games = Game.query.filter_by(public=True).filter(Game.closed != True).all()
    emit('get_games_success',{
        "games": parse_games(games),
    })

def close_users_open_games(user):
    games = Game.query.filter_by(closed = False).filter_by(creator = user).all()
    for game in games:
        game.closed = True
        db.session.add(game)
    db.session.commit()
    return len(games)

@socketio.on('create_game')
def create_game(data):
    user_id = data['user_id']
    creator = User.query.get(user_id)
    close_users_open_games(creator)
    if creator is not None:
        public = True
        if 'public' in data:
            public = data['public']
        game = Game(code=randomCode(), creator=creator, public=public, current_turn=1)
        db.session.add(game)
        create_player(game, creator)
        join_room(game.code)
        send_game_update(game)

@socketio.on('add_player')
def add_player(data):
    game = Game.query.get(data['game_id'])
    user = User.query.get(data['user_id'])
    user_exists = False
    user_count = (player for player in game.players if player.user == user)
    for i in user_count:
        user_exists = True
    if game is not None and user is not None and game.closed is not True:
        join_room(game.code)
        if user_exists is not True:
            create_player(game, user)
        join_room(game.code)
        send_game_update(game)

@socketio.on('assign_roles')
def assign_roles(data):
    game = Game.query.get(data['game_id'])
    join_room(game.code)
    if game.closed is not True:
        size = len(game.players.all())
        deck = create_deck(size)
        for player in game.players:
            player.role = deck.pop()
            db.session.add(player)
        db.session.add(game)
        db.session.commit()
        game.closed = True
        send_game_update(game)

@socketio.on('set_vote')
def set_vote(data):
    voter = Player.query.get(data['voter_id'])
    choice = Player.query.get(data['choice_id'])
    try:
        role = Role.query.get(data['role_id'])
    except KeyError:
        role = None
    game = voter.game
    turn = game.current_turn
    if verify_vote(voter, choice, turn, role):
        save_vote(voter, choice, turn, role)
        join_room(voter.game.code)
        send_game_update(game)
        if verify_everyone_voted(game, turn):
            results, num_roles = tally_all_votes(game, turn)
            if len(results) == num_roles: #Did all roles handle voting?
                handle_results(results)
                set_next_turn(game)
                winner = determine_winner(game)
                if winner is not None:
                    send_game_update(game, {"winner": winner})
                else:
                    send_game_update(game, {"votes": results})

@socketio.on('quit_player')
def quit_player(data):
    player = Player.query.get(data['player_id'])
    print("Quitting: ", player.user.username)
    game = player.game
    leave_room(game.code)
    if game.closed is True:
        player.alive = False
        db.session.add(player)
    else:
        if player.user == game.creator:
            delete_game(game)
        else:
            db.session.delete(player)
    db.session.commit()
    winner = determine_winner(game)
    send_game_update(game, {"quitter": parse_player(player)})
    if winner is not None:
        send_game_update(game, {"winner": winner})

@socketio.on_error()        # Handles the default namespace
def error_handler(e):
    emit('send_error', {'error': e})


###
# Admin Tools
###

def is_admin(admin_id, password):
    user = User.query.get(admin_id)
    if user.admin and user.verify_password(password):
        return True


@socketio.on('admin_set_role')
def admin_set_role(data):
    player = Player.query.get(data['player_id'])
    if is_admin(data['admin_id'], data['password']):
        role = Role.query.get(data['role_id'])
        game = player.game
        join_room(game.code)
        player.role = role
        db.session.add(player)
        db.session.commit()
        send_game_update(game)
        emit('admin_set_role_success',
             {
             "game": parse_game(game),
             "player": parse_player(player)
             }, room=game.code)
