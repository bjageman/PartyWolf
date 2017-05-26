from apps.games.models import Player

me = Player.query.get(29)
for vote in me.voted_on:
	if vote.role is not None:
		print(vote.voter.id,vote.role.name)
	else:
		print(vote.voter.id)

