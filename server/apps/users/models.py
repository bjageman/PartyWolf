from apps import db
from passlib.apps import custom_app_context as pwd_context

class User(db.Model):
    __tablename__ = 'user'
    id = db.Column(db.Integer, primary_key= True)
    username = db.Column(db.String(32), index = True)
    password_hash = db.Column(db.String(128))
    first_name = db.Column(db.String(32))
    last_name = db.Column(db.String(32))
    email = db.Column(db.String(64))
    gender = db.Column(db.String(32))
    admin = db.Column(db.Boolean,default=False)
    def hash_password(self, password):
        self.password_hash = pwd_context.hash(password)

    def verify_password(self, password):
        return pwd_context.verify(password, self.password_hash)

def authenticate(username, password):
    user = User.query.filter_by(username = username).first()
    if user and user.verify_password(password):
        return user

def identity(payload):
    user_id = payload['identity']
    user = User.query.filter_by(id = user_id).first()
    return user
