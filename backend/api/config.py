#!/usr/bin/python3
""" Application configuration file """
from decouple import config 

class Config:
    """ app global configuration """
    SECRET_KEY = config('SECRET_KEY')
    MONGO_URI = config('MONGO_URI')
