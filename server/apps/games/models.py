# Models to Create
#
# Game -> Players -> Role
# Players -> Users
# Game -> History

from apps import db
from apps.users.models import User

class Game(db.Model):
    __tablename__ = 'game'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(32))
    code = db.Column(db.String(32))
    public = db.Column(db.Boolean,default=False)
    closed = db.Column(db.Boolean,default=False)
    winner = db.Column(db.String(32))
    creator_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    creator = db.relationship('User', backref=db.backref('games', lazy='dynamic'))

class Player(db.Model):
    __tablename__ = 'player'
    id = db.Column(db.Integer, primary_key=True)
    alive = db.Column(db.Boolean, default=True)
    killed_by = db.Column(db.String(32))
    current_vote_id = db.Column(db.Integer, db.ForeignKey('player.id'), index=True)
    current_vote = db.relationship('Player', remote_side=id, backref='votes', post_update=True)
    game_id = db.Column(db.Integer, db.ForeignKey('game.id'))
    game = db.relationship('Game', backref=db.backref('players', lazy='dynamic'))
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    user = db.relationship('User', backref=db.backref('players', lazy='dynamic'))
    role_id = db.Column(db.Integer, db.ForeignKey('role.id'))
    role = db.relationship('Role', backref=db.backref('players', lazy='dynamic'))
    history_id = db.Column(db.Integer, db.ForeignKey('history.id'))
    history = db.relationship('History', backref=db.backref('deaths', lazy='dynamic'))

class Role(db.Model):
    __tablename__ = 'role'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(32))
    team = db.Column(db.String(32))
    ability = db.Column(db.String(32))
    #evil = db.Column(db.Boolean, default=False)

class History(db.Model):
    __tablename__ = 'history'
    id = db.Column(db.Integer, primary_key=True)
    turn = db.Column(db.Integer)
    game_id = db.Column(db.Integer, db.ForeignKey('game.id'))
    game = db.relationship('Game', backref=db.backref('histories', lazy='dynamic'))
