from . import WWTesting
from apps.games.models import Game, Player, Role, History
from apps.users.models import User

class SocketTests(WWTesting):

    def connect(self):
        self.socketio.connect(namespace='/games')
        self.socketio.emit('games_test', {"data": "IT WORKS"}, namespace='/games');
        response = self.socketio.get_received('/games')
        assert 'connected' in response[0]['args']

    def test_game_create(self):
        user_id = 1
        self.socketio.emit('create_game', {
            "user_id": user_id,
            "public": True,

        }, namespace='/games')
        response = self.socketio.get_received('/games')
        latest_response = response[-1]['args'][0]
        assert latest_response['game']['creator']['id'] == user_id
        assert len(latest_response['game']['players']) == 1
        assert latest_response['game']['players'][0]['user']['id'] == user_id

    def test_vote(self):
        voter_id = 1
        choice_id = 5
        self.socketio.connect(namespace='/games')
        self.socketio.emit('make_vote',{
            "voter_id": voter_id,
            "choice_id": choice_id,
            },
            namespace='/games');
        response = self.socketio.get_received('/games')
        assert 'TestUser0' in response[-1]['args'][0]['voter_username']
        assert 'TestUser4' in response[-1]['args'][0]['choice_username']
        voter = Player.query.get(voter_id)
        assert 'TestUser4' in voter.current_vote.user.username

    def test_add_user(self):
        game_id = 1
        user_id = 12
        expected_user = User.query.get(user_id).username
        self.socketio.connect(namespace='/games')
        self.socketio.emit('add_player',
            {
            "game_id": game_id,
            "user_id": 12,
            }, namespace='/games')
        response = self.socketio.get_received('/games')
        assert len(response[-1]['args'][0]['players']) == 11
        assert expected_user in response[-1]['args'][0]['players'][-1]['user']['username']

    def test_assign_roles(self):
        game_id = 1
        self.socketio.emit('assign_roles', {"game_id": game_id}, namespace='/games')
        response = self.socketio.get_received('/games')
        #Need more thorough checks
        assert len(response[-1]['args'][0]['players']) == 10
