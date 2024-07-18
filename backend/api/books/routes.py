from flask import Flask, request, jsonify
from backend.api import mongo, bcrypt


# Accessing the 'books' collection
books_collection = mongo.db.books

# Route to store books
@app.route('/api/books', methods=['POST'])
def add_books():
    try:
        books = request.get_json()
        result = books_collection.insert_many(books)
        return jsonify({'message': f'{len(result.inserted_ids)} books inserted successfully'}), 201
    except Exception as e:
        return jsonify({'error': str(e)}), 500
