""" Morereders application """
from flask import Flask
from flask_bcrypt import Bcrypt
from flask_pymongo import PyMongo
from flask_jwt_extended import JWTManager
from backend.api.config import Config


app = Flask(__name__)
app.config.from_object(Config)

mongo = PyMongo(app)
bcrypt = Bcrypt(app)
jwt = JWTManager(app)

from backend.api import routes
from backend.api.auth.routes import auth
from backend.api.users.routes import user
from backend.api.posts.routes import post
app.register_blueprint(auth)
app.register_blueprint(user)
app.register_blueprint(post)