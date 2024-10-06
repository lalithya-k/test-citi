from flask_pymongo import PyMongo

mongo = PyMongo()

def initialize_db(app):
    mongo.init_app(app)

import bcrypt

class User:
    def __init__(self, username, password):
        self.username = username
        self.password = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())

    def save(self):
        return mongo.db.users.insert_one(self.__dict__)

    @staticmethod
    def find_by_username(username):
        return mongo.db.users.find_one({'username': username})

    @staticmethod
    def validate_password(user, password):
        return bcrypt.checkpw(password.encode('utf-8'), user['password'])
