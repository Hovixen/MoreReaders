from flask import Blueprint, request, jsonify
from backend.api import mongo
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

    user = User(first_name, last_name, username, email, password)
    user_dict = user.to_dict()
    mongo.db.users.insert_one(user_dict)
    return jsonify({'message': 'User created', 'user id': str(user_dict['_id'])}), 201
