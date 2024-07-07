from backend.api import app, mongo
from flask import Flask, request, jsonify
from backend.api.models import User

@app.route('/', strict_slashes=False)
def index():
    return 'welcome to morereaders'
