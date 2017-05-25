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
    public = db.Column(db.Boolean,default=True)
    closed = db.Column(db.Boolean,default=False)
    winner = db.Column(db.String(32))
    creator_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    creator = db.relationship('User', backref=db.backref('games', lazy='dynamic'))

class Player(db.Model):
    __tablename__ = 'player'
    id = db.Column(db.Integer, primary_key=True)
    alive = db.Column(db.Boolean, default=True)
    killed_by = db.Column(db.String(32))
    game_id = db.Column(db.Integer, db.ForeignKey('game.id'))
    game = db.relationship('Game', backref=db.backref('players', lazy='dynamic'))
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    user = db.relationship('User', backref=db.backref('players', lazy='dynamic'))
    role_id = db.Column(db.Integer, db.ForeignKey('role.id'))
    role = db.relationship('Role', backref=db.backref('players', lazy='dynamic'))

class Vote(db.Model):
    __tablename__ = 'vote'
    id = db.Column(db.Integer, primary_key=True)
    turn = db.Column(db.Integer)
    voter_id = db.Column(db.Integer, db.ForeignKey('player.id'), index=True)
    voter = db.relationship('Player', backref='votes', post_update=True, foreign_keys=[voter_id])
    choice_id = db.Column(db.Integer, db.ForeignKey('player.id'), index=True)
    choice = db.relationship('Player', backref='voted_on', post_update=True, foreign_keys=[choice_id])
    role_id = db.Column(db.Integer, db.ForeignKey('role.id'))
    role = db.relationship('Role', backref=db.backref('votes', lazy='dynamic'))
    game_id = db.Column(db.Integer, db.ForeignKey('game.id'))
    game = db.relationship('Game', backref=db.backref('votes', lazy='dynamic'))


class Role(db.Model):
    __tablename__ = 'role'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(32))
    avatar = db.Column(db.String(256))
    ability = db.Column(db.String(32))
    evil = db.Column(db.Boolean, default=False)
