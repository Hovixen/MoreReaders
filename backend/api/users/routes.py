from flask import Blueprint, request, jsonify
from flask_jwt_extended import get_jwt_identity, jwt_required
from bson.objectid import ObjectId
from backend.api import mongo, bcrypt
from backend.api.models import User

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
            user_updates[key] = value
        else:
            return jsonify({'error': 'No valid field to update'}), 400
    
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