import os
import unittest
import json

from apps import app, db
from apps.users.models import User
from apps.games.models import Game, Player, Role, History
from apps.config import DATABASE_TEST

from collections import Counter

roles = [{"name":"Werewolf", "team":"WW"}, {"name":"Villager", "team":"VILLAGERS"}]

class MyTest(unittest.TestCase):
    headers={
        'Content-Type':'application/json',
    }
    def parseData(self, data):
        return json.loads(data.decode("utf-8"))

    def setAuthToken(self, username, password):
        response = self.app.post('/auth',
            data='{"username":"' + username + '","password":"' + password + '"}',
            headers=self.headers)
        data = self.parseData(response.data)
        self.headers['Authorization'] = 'JWT ' + data['access_token']

    def initDB(self):
        game = Game(code="TESTCODE")
        db.session.add(game)
        for i in roles:
            role = Role(name=i['name'], team=i['team'])
            db.session.add(role)
        db.session.commit()
        for i in range(10):
            user = User(username="TestUser" + str(i))
            user.hash_password("password")
            db.session.add(user)
            if i < 2:
                role = Role.query.get(1)
            else:
                role = Role.query.get(2)
            player = Player(game=game, user=user, role=role)
            db.session.add(player)
        db.session.commit()

    def setUp(self):
        app.config['TESTING'] = True
        app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
        app.config['SQLALCHEMY_DATABASE_URI'] = DATABASE_TEST
        self.app = app.test_client()
        db.create_all()
        self.initDB()

    def test_user_login(self):
        username = "TestUser1"
        correct_password = "password"
        incorrect_password = "Password"
        user = User.query.filter_by(username=username).first()
        assert username in user.username
        assert user.verify_password(correct_password)
        assert not user.verify_password(incorrect_password)

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

    def test_make_vote(self):
        self.player_count()
        game = Game.query.get(1)
        self.kill_players_by_id(game, [9,10], 1)
        guilty_player = game.players.all()[2]
        innocent_player = game.players.all()[1]
        for player in game.players:
            if player.id != innocent_player.id and player.id != guilty_player.id:
                if player.id > 6:
                    player.current_vote = innocent_player
                else:
                    player.current_vote = guilty_player
                db.session.add(player)
        db.session.commit()
        votes = Counter(player.current_vote.user.username for player in game.players.filter_by(alive=True) if player.current_vote is not None)
        voted = votes.most_common(1)[0][0]
        assert guilty_player.user.username in voted
        self.kill_player_by_username(voted, 2)

    def tearDown(self):
        db.session.remove()
        db.drop_all()

if __name__ == '__main__':
    unittest.main()
