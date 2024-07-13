from flask import Blueprint, request, jsonify
from flask_jwt_extended import get_jwt_identity, jwt_required
from bson.objectid import ObjectId
from backend.api import mongo, bcrypt
from datetime import datetime

user = Blueprint('user', __name__)


@user.route('/profile/<user_id>', methods=['PUT'], strict_slashes=False)
@jwt_required()
def update_profile(user_id):
    """ updates the users profile details """
    data = request.json

    current_user_id = get_jwt_identity()
    current_user = mongo.db.users.find_one({'_id': ObjectId(current_user_id)})
    if not current_user:
        return jsonify({'error': 'Unauthorized'}), 401
    if current_user_id != user_id and not current_user['is_admin']:
        return jsonify({'error': 'You can only update your profile'}), 403
    
    valid_keys = ['username', 'password', 'bio']
    user_updates = {}
    for key, value in data.items():
        if key in valid_keys:
            if key == 'password':
                user_updates[key] = bcrypt.generate_password_hash(value).decode('utf-8')
            else:
                user_updates[key] = value
        else:
            return jsonify({'error': 'No valid field to update'}), 400
    user_updates['updated_at'] = datetime.utcnow()
    
    # only returns the updated fields
    result = mongo.db.users.find_one_and_update(
        {'_id': ObjectId(user_id)},
        {'$set': user_updates},
        return_document=True,
        projection={field:1 for field in user_updates}
    )

    res = {
        'message': 'User infomation updated successfully',
        'updated_fields': {field: result[field] for field in user_updates}
    }
    return jsonify(res), 200


@user.route('/profile/<user_id>', strict_slashes=False)
@jwt_required()
def get_profile(user_id):
    """ retrieves the users profile details """
    
    user = mongo.db.users.find_one({'_id': ObjectId(user_id)})
    if not user:
        return jsonify({'error': 'No User found'}), 404
    
    fields = [
        '_id', 'first_name', 'last_name', 'username', 'email',
        'profile_picture', 'followers', 'following', 'bio', 'created_at'
        ]

    res = {field: user.get(field) for field in fields}
    res['id'] = str(res['_id'])
    res.pop('_id')
    return jsonify(res), 200


@user.route('/profile/<user_id>', methods=['DELETE'], strict_slashes=False)
@jwt_required()
def delete_profile(user_id):
    """ updates the users profile details """
    current_user_id = get_jwt_identity()
    current_user = mongo.db.users.find_one({'_id': ObjectId(current_user_id)})
    if not current_user:
        return jsonify({'error': 'Unauthorized'}), 401
    if current_user_id != user_id and not current_user['is_admin']:
        return jsonify({'error': 'You can only delete your profile'}), 403
       
    # only returns the updated fields
    mongo.db.users.delete_one({'_id': ObjectId(user_id)})
    return jsonify({'message': 'Profile deleted successfull'}), 200


@user.route('/profile/<user_id>/follow', methods=['PUT'], strict_slashes=False)
@jwt_required()
def follow_user(user_id):
    """ updates user followers """
    current_user_id = get_jwt_identity()
    follow_user = mongo.db.users.find_one({'_id': ObjectId(user_id)})

    if not follow_user:
        return jsonify({'error': 'No user found'}), 404

    if current_user_id == str(follow_user['_id']):
        return jsonify({'error': 'You cannot follow yourself'}), 403

    mongo.db.users.find_one_and_update(
        {'_id': ObjectId(current_user_id)},
        {'$addToSet': { 'followings': ObjectId(user_id) }}
    )
    
    mongo.db.users.find_one_and_update(
        {'_id': ObjectId(user_id)},
        {'$addToSet': { 'followers': ObjectId(current_user_id) }}
    )
    return jsonify({'message': 'User followed successfully'})


@user.route('/profile/<user_id>/unfollow', methods=['PUT'], strict_slashes=False)
@jwt_required()
def unfollow_user(user_id):
    """ updates user followers """
    current_user_id = get_jwt_identity()
    unfollow_user = mongo.db.users.find_one({'_id': ObjectId(user_id)})

    if not follow_user:
        return jsonify({'error': 'No user found'}), 404

    if current_user_id == str(unfollow_user['_id']):
        return jsonify({'error': 'You cannot unfollow yourself'}), 403

    mongo.db.users.find_one_and_update(
        {'_id': ObjectId(current_user_id)},
        {'$pull': { 'followings': ObjectId(user_id) }}
    )
    
    mongo.db.users.find_one_and_update(
        {'_id': ObjectId(user_id)},
        {'$pull': { 'followers': ObjectId(current_user_id) }}
    )
    return jsonify({'message': 'User unfollowed successfully'})
