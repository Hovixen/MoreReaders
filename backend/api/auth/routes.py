from flask import Blueprint, request, jsonify
from backend.api import mongo, bcrypt
from flask_jwt_extended import (create_access_token, create_refresh_token,
                                jwt_required)
from backend.api.models import User

auth = Blueprint('auth', __name__)


@auth.route('/signup', methods=['POST'], strict_slashes=False)
def register():
    """ function registers the user """
    data = request.json
    first_name = data.get('first_name')
    last_name = data.get('last_name')
    username = data.get('username')
    email = data.get('email')
    password = data.get('password')
    
    # hashed the password
    hashed_pwd = bcrypt.generate_password_hash(password).decode('utf-8')

    user = User(first_name, last_name, username, email, hashed_pwd)
    user_dict = user.to_dict()
    mongo.db.users.insert_one(user_dict)
    return jsonify(
        {
            'message': 'User created',
            'user id': str(user_dict['_id'])
        }
        ), 201


@auth.route('/login', methods=['POST'], strict_slashes=False)
def login():
    """ login function without using jwt authorization """
    data = request.json
    email = data.get('email')
    password = data.get('password')

    user = mongo.db.users.find_one({ 'email': email })

    if user:
        if bcrypt.check_password_hash(user['password'], password):
            access_token = create_access_token(identity=str(user['_id']))
            refresh_token = create_refresh_token(identity=str(user['_id']))

            return jsonify (
                {
                    'message': 'User successfully logged in',
                    'user_id': str(user['_id']),
                    'username': user['username'],
                    'access_token': access_token,
                    'refresh_token': refresh_token
                }
            ), 200
        else:
            return jsonify(
                {
                    'error': 'Invalid email or password. Try again'
                }
                ), 401
    return jsonify({'error': 'User does not exist'}), 404


@auth.route('/refresh', methods=['POST'], strict_slashes=False)
@jwt_required(refresh=True)
def token_refresh():
    """ function refreshes token when access token expires """
    current_user = get_jwt_identity()
    new_access_token = create_access_token(identity=current_user)
    return jsonify(access_token=new_access_token)