from flask import Blueprint, request, jsonify
from services.auth_service import login_user, logout_user, register_user

auth_bp = Blueprint('auth', __name__)

@auth_bp.route('/register', methods=['POST'])
def register():
    data = request.json
    result = register_user(data['userName'], 'sample')
    return jsonify(result)

@auth_bp.route('/login', methods=['POST'])
def login():
    data = request.json
    result = login_user(data['username'], data['password'])
    return jsonify(result)

@auth_bp.route('/logout', methods=['POST'])
def logout():
    result = logout_user()
    return jsonify(result)