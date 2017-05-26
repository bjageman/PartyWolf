from . import WWTesting
from apps.games.models import Game, Player, Role, Vote
from apps.users.models import User

import json

class SocketTests(WWTesting):

    def connect(self):
        self.socketio.connect()
        self.socketio.emit('games_test', {"data": "IT WORKS"});
        response = self.socketio.get_received()
        assert 'connected' in response[0]['args']

    def login(self):
        username = "TestUser1"
        password = "password"
        self.socketio.emit('login', {
            "username": username,
            "password": password,
        })
        response = self.socketio.get_received()
        latest_response = response[-1]['args'][0]
        assert username in latest_response['user']['username']

    def game_create(self):
        user_id = 1
        self.socketio.emit('create_game', {
            "user_id": user_id,
            "public": True,

        })
        response = self.socketio.get_received()
        latest_response = responchoice_idse[-1]['args'][0]
        assert latest_response['game']['creator']['id'] == user_id
        assert len(latest_response['game']['players']) == 1
        assert latest_response['game']['players'][0]['user']['id'] == user_id

    def test_vote(self):
        voter_id = 1
        choice_id = 5
        self.socketio.connect()
        self.socketio.emit('set_vote',{
            "voter_id": voter_id,
            "choice_id": choice_id,
            });
        response = self.socketio.get_received()
        latest_response = response[-1]['args'][0]
        assert latest_response['game']['players'][choice_id - 1]['id'] == choice_id
        assert latest_response['game']['players'][choice_id -1]['votes']['default'] == 1
        assert 'werewolf' not in latest_response['game']['players'][4]['votes']
        assert len(latest_response['game']['players'][3]['votes']) == 0

    def test_special_vote(self):
        voter_id = 1
        choice_id = 5
        role_id = 1
        role_name = "Werewolf"
        self.socketio.connect()
        self.socketio.emit('set_vote',{
            "voter_id": voter_id,
            "choice_id": choice_id,
            "role_id": role_id,
            });
        response = self.socketio.get_received()
        latest_response = response[-1]['args'][0]
        assert latest_response['game']['players'][choice_id - 1]['id'] == choice_id
        assert latest_response['game']['players'][choice_id -1]['votes'][role_name] == 1
        assert 'werewolf' not in latest_response['game']['players'][4]['votes']
        assert len(latest_response['game']['players'][3]['votes']) == 0

    def vote_full_turn(self):
        self.socketio.connect()
        villager_target = 1
        ww_target = 2
        seer_target = 5
        game = self.db.session.query(Game).filter_by(code="TESTCODE").join(Player).first()
        players = self.db.session.query(Player).filter_by(game=game).join(Role).all()
        player_set = []
        for player in players:
            player_set.append({
                "voter_id" : player.id,
                "role_id" : player.role.id,
                "role_name" : player.role.name
                })
        for counter, player in enumerate(player_set):
            self.socketio.emit('set_vote',{
                "voter_id": player["voter_id"],
                "choice_id": villager_target,
                });
            if player["role_name"] == "Werewolf":
                self.socketio.emit('set_vote',{
                    "voter_id": player["voter_id"],
                    "choice_id": ww_target,
                    "role_id": player["role_id"],
                    });
            if player["role_name"] == "Seer":
                self.socketio.emit('set_vote',{
                    "voter_id": player["voter_id"],
                    "choice_id": seer_target,
                    "role_id": player["role_id"],
                    });
        response = self.socketio.get_received()
        # print(json.dumps(response, sort_keys=True, indent=4, separators=(',', ': ')))
        latest_response = response[-1]['args'][0]
        print(json.dumps(latest_response, sort_keys=True, indent=4, separators=(',', ': ')))
        assert latest_response['results']['default']['user']['id'] == villager_target
        assert latest_response['results']['Werewolf']['user']['id'] == ww_target
        assert latest_response['results']['Seer']['user']['id'] == seer_target

    def add_user(self):
        game_id = 1
        user_id = 12
        expected_user = User.query.get(user_id).username
        self.socketio.connect()
        self.socketio.emit('add_player',
            {
            "game_id": game_id,
            "user_id": 12,
            })
        response = self.socketio.get_received()
        latest_response = response[-1]['args'][0]['game']
        assert len(latest_response['players']) == 11
        assert expected_user in latest_response['players'][-1]['user']['username']

    def assign_roles(self):
        game_id = 1
        self.socketio.emit('assign_roles', {"game_id": game_id})
        response = self.socketio.get_received()
        latest_response = response[-1]['args'][0]['game']
        #Need more thorough checks
        assert len(latest_response['players']) == 10
