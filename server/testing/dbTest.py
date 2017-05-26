from . import WWTesting
from collections import Counter

from apps.users.models import User
from apps.games.models import Game, Player, Role, Vote

class DBTests(WWTesting):
    def user_login(self):
        username = "TestUser1"
        correct_password = "password"
        incorrect_password = "Password"
        user = User.query.filter_by(username=username).first()
        assert username in user.username
        assert user.verify_password(correct_password)
        assert not user.verify_password(incorrect_password)

    def make_vote(self):
        self.player_count()
        game = Game.query.get(1)
        self.kill_players_by_id(game, [9,10], 1)
        guilty_player = game.players.all()[2]
        innocent_player = game.players.all()[1]
        for player in game.players:
            if player.id != innocent_player.id and player.id != guilty_player.id:
                if player.id > 8:
                    vote = Vote(turn=1, choice=innocent_player, voter=player)
                else:
                    vote = Vote(turn=1, choice=guilty_player, voter=player)
                self.db.session.add(vote)
        self.db.session.commit()
        guilty_player_count = []
        innocent_player_count = []
        for player in game.players:
            votes = (vote for vote in player.votes if vote.turn == 1)
            for vote in votes:
                if vote.choice == guilty_player:
                    guilty_player_count.append(vote)
                if vote.choice == innocent_player:
                    innocent_player_count.append(vote)
        assert len(guilty_player_count) == 6
        assert len(innocent_player_count) == 2
