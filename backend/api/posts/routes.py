from flask import Blueprint, request, jsonify, current_app
from flask_jwt_extended import get_jwt_identity, jwt_required
from bson.objectid import ObjectId
from backend.api.models import Post
from backend.api import mongo
from datetime import datetime
from backend.api.utils import upload
import uuid
import os

post = Blueprint('post', __name__)


@post.route('/post', methods=['POST'], strict_slashes=False)
@jwt_required()
def add_post():
    """ add users post """
    data = dict(request.form)
    current_user_id = get_jwt_identity()
    title = data.get('title')
    details = data.get('details')
    book_img = data.get('book_img')
    book_file = data.get('book_file')

    print("book_img: {}".format(book_img))
    print("book_file: {}".format(book_file))

    img_path = None
    book_path = None

    if not title or not details:
        return jsonify({'error': 'Title and details are required'}), 400
    if book_img:
        img_path = upload(book_img, current_app.config['UPLOAD_IMAGE'])
        print("img_path:{}".format(img_path))
    if book_file:
        book_path = upload(book_file, current_app.config['UPLOAD_BOOKS'])
        print("book_path:{}".format(book_path))

    post = Post(current_user_id, title, details, img_path, book_path)
    post_dict = post.to_dict()
    # post_dict['created_at'] = datetime.utcnow()
    mongo.db.posts.insert_one(post_dict)
    post_dict['id'] = str(post_dict['_id'])
    post_dict.pop('_id')

    return jsonify({
        'message': 'Post added successfully',
        'post': post_dict
    }), 200


@post.route('/post/<post_id>', methods=['PUT'], strict_slashes=False)
@jwt_required()
def update_post(post_id):
    """ updates users post """
    data = request.json
    current_user_id = get_jwt_identity()
    post = mongo.db.posts.find_one({'_id': ObjectId(post_id)})

    if not post:
        return jsonify({'error': 'Post not found'}), 404

    if not current_user_id:
        return jsonify({'error': 'Unauthorized'}), 401
    if current_user_id != post.get('user_id'):
        return jsonify({'error': 'You can only edit your post'}), 403
    
    valid_keys = ['title', 'details', 'book_img', 'book_file']
    post_update = {key: value for key, value in data.items() if key in valid_keys}
    post_update['updated_at'] = datetime.utcnow()

    result = mongo.db.posts.find_one_and_update(
        {'_id': ObjectId(post_id)},
        {'$set': post_update},
        return_document=True,
        projection={field: 1 for field in post_update}
    )

    res = {
        'message': 'Post updated successfully',
        'profile_update': {field: result[field] for field in post_update }
    }

    return jsonify(res), 200


@post.route('/post/<post_id>', methods=['DELETE'], strict_slashes=False)
@jwt_required()
def delete_post(post_id):
    """ deletes users post """
    current_user_id = get_jwt_identity()
    post = mongo.db.posts.find_one({'_id': ObjectId(post_id)})

    if not post:
        return jsonify({'error': 'Post not found'}), 404

    if not current_user_id:
        return jsonify({'error': 'Unauthorized'}), 401
    if current_user_id != post.get('user_id'):
        return jsonify({'error': 'You can only delete your post'}), 403

    mongo.db.posts.delete_one({'_id': ObjectId(post_id)})

    res = {
        'message': 'Post deleted successfully'
    }
    return jsonify(res), 200


@post.route('/like/<post_id>', methods=['PUT'], strict_slashes=False)
@jwt_required()
def like_post(post_id):
    """ like or dislike a users post """
    current_user_id = get_jwt_identity()
    post = mongo.db.posts.find_one({'_id': ObjectId(post_id)})
    if not post:
        return jsonify({'error': 'Post not found'}), 404

    if current_user_id in post.get('likes', []):
        result = mongo.db.posts.update_one(
            {'_id': ObjectId(post_id)},
            {'$pull': {'likes': current_user_id}}
        )
        message = 'Post disliked successfully'
    else:
        result = mongo.db.posts.update_one(
            {'_id': ObjectId(post_id)},
            {'$addToSet': {'likes': current_user_id}}
        )
        message = 'Post liked successfully'

    if result.matched_count:
        return jsonify({'message': message, 'post_id': post_id}), 200
    else:
        return jsonify({'error': 'Post not found or Unauthorized'}), 404


@post.route('/post/<post_id>', strict_slashes=False)
@jwt_required()
def get_post(post_id):
    """ retrieves a post """
    post = mongo.db.posts.find_one({'_id': ObjectId(post_id)})
    if not post:
        return jsonify({'error': 'Post not found'}), 404
    post['id'] = str(post['_id'])
    post.pop('_id')
    return jsonify({'post': post})


@post.route('/post', strict_slashes=False)
@jwt_required()
def timeline():
    """ retrieves all users post """
    current_user_id = get_jwt_identity()
    current_user = mongo.db.users.find_one({'_id': ObjectId(current_user_id)})
    # print (current_user_id)
    # get the ids for the user followings
    id_followings = current_user.get('followings', [])
    all_id = [current_user_id]
    # print (all_id)
    for id_following in id_followings:
        all_id.append(str(id_folloing['_id']))
    posts = list(mongo.db.posts.find({'user_id': {'$in': all_id}}))
    print (posts)

    for post in posts:
        post['_id'] = str(post['_id'])
        post['user_id'] = str(post['user_id'])

    return jsonify({
        'posts': posts,
        }), 200 


@post.route('/comments/<post_id>', methods=['POST'], strict_slashes=False)
@jwt_required()
def add_comments(post_id):
    """ adds comments to a post """
    data = request.json
    post = mongo.db.posts.find_one({'_id': ObjectId(post_id)})
    if not post:
        return jsonify({'error': 'Post not found'}), 404

    comment = {key: value for key, value in data.items()}
    comment['comment_id'] = str(uuid.uuid4())
    comment['created_at'] = datetime.utcnow()
    post['comments'][comment['comment_id']] = comment

    result = mongo.db.posts.update_one(
        {'_id': ObjectId(post_id)},
        {'$set': {'comments': post['comments']}}
    )

    if result.modified_count == 1:
        res = {
            'message': 'Comment added successfully',
            'post_id': str(post['_id']),
            'comment': comment
        }
        return jsonify(res), 200
    else:
        return jsonify({'error': 'Failed to add comment'}), 500