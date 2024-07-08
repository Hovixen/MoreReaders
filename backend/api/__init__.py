""" Morereders application """
from flask import Flask
from flask_bcrypt import Bcrypt
from flask_pymongo import PyMongo
from backend.api.config import Config


app = Flask(__name__)
app.config.from_object(Config)

mongo = PyMongo(app)
bcrypt = Bcrypt(app)

from backend.api.auth.routes import auth
from backend.api import routes
app.register_blueprint(auth)