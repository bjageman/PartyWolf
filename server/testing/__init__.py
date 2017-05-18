import os
import unittest
import json

from apps import app, db, socketio
from apps.users.models import User
from apps.games.models import Game, Player, Role, History

from apps.config import DATABASE

from flask_socketio import SocketIO, SocketIOTestClient

roles = [{"name":"Werewolf", "team":"W"}, {"name":"Villager", "team":"V"}, {"name":"Seer", "team":"V"}]

class TestingBase(unittest.TestCase):
    def setAuthToken(self, username, password):
        response = self.app.post('/auth',
            data='{"username":"' + username + '","password":"' + password + '"}',
            headers=self.headers)
        data = self.parseData(response.data)
        self.headers['Authorization'] = 'JWT ' + data['access_token']

    def initDB(self):
        game = Game(code="TESTCODE")
        self.db.session.add(game)
        for i in roles:
            role = Role(name=i['name'], team=i['team'])
            self.db.session.add(role)
        self.db.session.commit()
        for i in range(15):
            user = User(username="TestUser" + str(i))
            user.hash_password("password")
            self.db.session.add(user)
            if i < 2:
                role = Role.query.get(1)
            else:
                role = Role.query.get(2)
            if i < 10:
                player = Player(game=game, user=user, role=role)
                self.db.session.add(player)
        self.db.session.commit()

    def setUp(self):
        app.config['TESTING'] = True
        app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
        app.config['SQLALCHEMY_DATABASE_URI'] = DATABASE_TEST
        self.app = app.test_client()
        self.db = db
        self.db.create_all()
        self.socketio = SocketIOTestClient(app, socketio)
        self.initDB()


    def tearDown(self):
        self.socketio.disconnect()
        self.db.session.expunge_all()
        self.db.session.remove()
        self.db.session.close()
        self.db.drop_all()


class WWTesting(TestingBase):
    def log_history(self, game, turn, players):
        history = History(game=game, turn=turn)
        for player in players:
            player.history = history
        db.session.commit()

    def kill_players_by_id(self, game, playerids = [], turn = 0):
        players = []
        for playerid in playerids:
            player = Player.query.get(playerid)
            players.append(player)
            player.alive = False
        db.session.commit()
        self.log_history(game, turn, players)

    def kill_player_by_username(self, username, turn = 0):
        user = User.query.filter_by(username=username).first()
        game = Game.query.get(1)
        #player = game.players.filter(Player.user.has(username=username)).first()
        player = game.players.join(Player.user, aliased=True).filter_by(username=username).first()
        assert username in player.user.username
        player.alive = False
        db.session.commit()
        assert game.players.join(Player.user, aliased=True).filter_by(username=username).first().alive is not True
        self.log_history(game, turn, [player])

    def player_count(self):
        game = Game.query.get(1)
        counter = {"Villagers": 0, "Werewolves": 0}
        for player in game.players:
            if player.role.name == "Werewolf":
                counter['Werewolves'] = counter['Werewolves'] + 1
            elif player.role.name == "Villager":
                counter['Villagers'] = counter['Villagers'] + 1
        return counter
