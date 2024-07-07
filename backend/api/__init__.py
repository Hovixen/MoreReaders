""" Morereders application """
from flask import Flask
from flask_pymongo import PyMongo
from backend.api.config import Config


app = Flask(__name__)
app.config.from_object(Config)

mongo = PyMongo(app)

from backend.api.auth.routes import auth
from backend.api import routes
app.register_blueprint(auth)