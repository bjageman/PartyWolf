from flask import Flask, abort, request, jsonify, make_response
from flask_jwt import jwt_required, current_identity
from . import users

from .models import User
from apps.database import *

@users.route('/<int:id>')
def get_user(id):
    user = User.query.get(id)
    if not user:
        abort(400)
    return jsonify({'username': user.username})

@users.route('', methods=['POST'])
def create_user():
    try:
        data = request.get_json()
        username = data['username']
        password = data['password']
        first_name = data.get('first_name')
        last_name = data.get('last_name')
        email = data.get('email')
    except (AttributeError, KeyError):
        abort(400)
    if User.query.filter_by(username = username).first() is not None:
        abort(400)
    user = User(username = username, first_name = first_name, last_name = last_name, email = email)
    user.hash_password(password)
    db.session.add(user)
    db.session.commit()
    return jsonify({ 'username': user.username })

@users.route('', methods=['GET'])
@jwt_required()
def get_profile():
    return jsonify({
        'id': current_identity.id,
        'username': current_identity.username,
        'first_name': current_identity.first_name,
        'last_name': current_identity.last_name,
        'email': current_identity.email,
        })

@users.route('', methods=['PUT'])
@jwt_required()
def update_profile():
    if not request.json:
        abort(400)
    user = User.query.get(current_identity.id)
    if user is not None:
        if 'first_name' in request.json:
            user.first_name = request.json['first_name']
        if 'last_name' in request.json:
            user.last_name = request.json['last_name']
        if 'email' in request.json:
            user.email = request.json['email']
        db.session.commit()
        return jsonify({
            'username': current_identity.username,
            'first_name': current_identity.first_name,
            'last_name': current_identity.last_name,
            'email': current_identity.email,
            })
    abort(404)

@users.errorhandler(404)
def not_found(error):
    return make_response(jsonify({'error': 'Not found'}), 404)

@users.errorhandler(401)
def unauthorized(error):
    return make_response(jsonify({'error': 'Unauthorized access'}), 401)

@users.errorhandler(400)
def bad_request(error):
    return make_response(jsonify({'error': 'Bad Request'}), 400)
