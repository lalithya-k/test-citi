from models.user import User
from flask import session

def register_user(username, password):
    if User.find_by_username(username):
        return {"message": "User already exists"}, 400
    user = User(username, password)
    user.save()
    return {"message": "User registered successfully"}, 201

def login_user(username, password):
    user = User.find_by_username(username)
    if user and User.validate_password(user, password):
        session['username'] = username
        return {"message": "Login successful"}, 200
    return {"message": "Invalid credentials"}, 401

def logout_user():
    session.pop('username', None)
    return {"message": "Logged out successfully"}, 200
