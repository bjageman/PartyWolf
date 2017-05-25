from . import WWTesting
from apps.games.models import Game, Player, Role, Vote
from apps.users.models import User

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
        latest_response = response[-1]['args'][0]
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
        print(latest_response['results'])
        assert latest_response['game']['players'][4]['id'] == 5
        assert latest_response['game']['players'][4]['votes'] == 1
        assert latest_response['game']['players'][3]['votes'] == 0


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
