from . import WWTesting
from collections import Counter

from apps.users.models import User
from apps.games.models import Game, Player, Role, History

class DBTests(WWTesting):
    def test_user_login(self):
        username = "TestUser1"
        correct_password = "password"
        incorrect_password = "Password"
        user = User.query.filter_by(username=username).first()
        assert username in user.username
        assert user.verify_password(correct_password)
        assert not user.verify_password(incorrect_password)

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
                self.db.session.add(player)
        self.db.session.commit()
        votes = Counter(player.current_vote.user.username for player in game.players.filter_by(alive=True) if player.current_vote is not None)
        voted = votes.most_common(1)[0][0]
        assert guilty_player.user.username in voted
        self.kill_player_by_username(voted, 2)
