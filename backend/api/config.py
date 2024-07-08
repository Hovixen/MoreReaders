#!/usr/bin/python3
""" Application configuration file """
from decouple import config
from urllib.parse import quote_plus

class Config:
    """ app global configuration """
    username = config('MONGO_USERNAME')
    pwd = config('MONGO_PASSWORD')
    mongo_url = config('MONGO_URL')

    esc_user = quote_plus(username)
    esc_pwd = quote_plus(pwd)

    SECRET_KEY = config('SECRET_KEY')
    MONGO_URI = 'mongodb+srv://{}:{}@{}'.format(esc_user, esc_pwd, mongo_url)
        
