from flask_socketio import SocketIO, emit, send, join_room, leave_room, \
    close_room, rooms, disconnect
from flask import Flask

from collections import Counter

from . import games
from apps.games.models import Game, Player, Role, Vote
from apps.users.models import User
from apps.parsers import *
from apps.database import *

from apps import socketio, db

from .utils import *

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


@socketio.on('create_game')
def create_game(data):
    user_id = data['user_id']
    creator = User.query.get(user_id)
    if creator is not None:
        public = True
        if 'public' in data:
            public = data['public']
        game = Game(code=randomCode(), creator=creator, public=public, current_turn=1)
        db.session.add(game)
        create_player(game, creator)
        join_room(game.code)
        emit('create_game_success',{
            "game": parse_game(game),
        }, room=game.code) #Won't need this for create_game

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
        emit('join_game_success',{
             "game": parse_game(game),
             })
        emit('add_player_success',{
             "game": parse_game(game),
             }, room=game.code)

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
        emit('assign_roles_success',
             {
             "game": parse_game(game),
             }, room=game.code)

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
    print(turn)
    results = {}
    if verify_vote(voter, choice, turn, role):
        save_vote(voter, choice, turn, role)
        join_room(voter.game.code)
        emit('vote_success',
            {
            "game": parse_game(game),
            }, room=game.code)
        if verify_everyone_voted(game, turn):
            results, num_roles = tally_all_votes(game, turn)
            if len(results) == num_roles:
                print("Emit final")
                if 'default' in results:
                    kill_player(results['default'])
                if 'Werewolf' in results:
                    kill_player(results['Werewolf'])
                set_next_turn(game)
                emit('vote_final',
                    {
                    "game": parse_game(game),
                    "results": results,
                    }, room=game.code)
                winner = determine_winner(game)
                if winner is not None:
                    emit('game_final',
                        {
                        "result": winner,
                        }, room=game.code)

def delete_game(game):
    print("Deleting game")
    game_id = game.id
    game_code = game.code
    db.session.delete(game)
    db.session.commit()
    emit('delete_game_success',
    {
        "deleted": game_id,
    }, room=game_code)

@socketio.on('quit_player')
def quit_player(data):
    player = Player.query.get(data['player_id'])
    game = player.game
    join_room(game.code)
    if player.user == game.creator and game.closed is not True:
        delete_game(game)
    else:
        player.alive = False
        db.session.add(player)
        db.session.commit()
        winner = determine_winner(game)
        emit('quit_player_success',
        {
            "game": parse_game(game),
            "quitter": parse_player(player)
        }, room=game.code)
        if winner is not None:
            emit('game_final',
                {
                "result": winner,
                }, room=game.code)

@socketio.on_error()        # Handles the default namespace
def error_handler(e):
    emit('error', {'error': e})



###
# Admin Tools
###

#IMPLEMENT LATER
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
        emit('admin_set_role_success',
             {
             "game": parse_game(game),
             "player": parse_player(player)
             }, room=game.code)
