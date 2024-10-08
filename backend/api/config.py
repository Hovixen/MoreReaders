#!/usr/bin/python3
""" Application configuration file """
import os
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
    JWT_SECRET_KEY = config('JWT_SECRET_KEY')
    JWT_ACCESS_TOKEN_EXPIRES = False
    JWT_REFRESH_TOKEN_EXPIRES = 86400
    MONGO_URI = 'mongodb+srv://{}:{}@{}'.format(esc_user, esc_pwd, mongo_url)

    REACT_PUBLIC_FOLDER = os.path.join('morereaders', 'public')
    UPLOAD_IMAGE = os.path.join(REACT_PUBLIC_FOLDER, 'assets', 'images')
    UPLOAD_BOOKS = os.path.join(REACT_PUBLIC_FOLDER, 'assets', 'books')

    os.makedirs(UPLOAD_IMAGE, exist_ok=True)    
    os.makedirs(UPLOAD_BOOKS, exist_ok=True)

    # PROXY_URL = config('PROXY_URL')
    # PROXY_PORT = config('PROXY_PORT')

    # if PROXY_URL and PROXY_PORT:
    #     os.environ['http_proxy'] = 'http://{}:{}'.format(PROXY_URL, PROXY_PORT)
    #     os.environ['https_proxy'] = 'https://{}:{}'.format(PROXY_URL, PROXY_PORT)