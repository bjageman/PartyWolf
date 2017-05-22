def parse_user(user, player=None):
    return ({
        "id": user.id,
        "username": user.username,
        "player": parse_player(player)
    })

def parse_game(game):
    return ({
        "id": game.id,
        "code": game.code,
        "public": game.public,
        "creator": parse_user(game.creator),
        "players": parse_players(game.players)
    })

def parse_role(role):
    if role is not None:
        return ({
            "id": role.id,
            "name": role.name,
            "team": role.team
        })
    return None

def parse_player(player):
    if player is not None:
        return ({
            "id": player.id,
            "user": parse_user(player.user),
            "role": parse_role(player.role)
        })
    return None

def parse_players(players):
    parsedPlayers = []
    for player in players:
        parsedPlayers.append(parse_player(player))
    return parsedPlayers
