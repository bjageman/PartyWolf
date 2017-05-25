def parse_user(user, player=None):
    try:
        return ({
            "id": user.id,
            "username": user.username,
            "player": parse_player(player)
        })
    except AttributeError:
        return None


def parse_game(game):
    creator = None
    if game.creator is not None:
        creator = parse_user(game.creator)
    return ({
        "id": game.id,
        "code": game.code,
        "public": game.public,
        "creator": creator,
        "players": parse_players(game.players)
    })

def parse_role(role):
    if role is not None:
        return ({
            "id": role.id,
            "name": role.name,
            "avatar": role.avatar,
            "evil": role.evil,
        })
    return None

def parse_player(player):
    if player is not None:
        return ({
            "id": player.id,
            "user": parse_user(player.user),
            "role": parse_role(player.role),
            "votes": len(player.voted_on),
            "alive": player.alive,
        })
    return None

def parse_players(players):
    parsedPlayers = []
    for player in players:
        parsedPlayers.append(parse_player(player))
    return parsedPlayers

def parse_games(games):
    parsedGames = []
    for game in games:
        parsedGames.append(parse_game(game))
    return parsedGames
