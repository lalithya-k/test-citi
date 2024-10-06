from flask import Blueprint, request, jsonify
from services.expense_service import create_expense, get_expenses, update_expense, delete_expense

expenses_bp = Blueprint('expenses', __name__)

@expenses_bp.route('/', methods=['POST'])
def add_expense():
    data = request.json
    result = create_expense(data['description'], data['amount'], data['budget_id'])
    return jsonify(result), 201

@expenses_bp.route('/', methods=['GET'])
def list_expenses():
    result = get_expenses()
    return jsonify(result)

@expenses_bp.route('/<expense_id>', methods=['PUT'])
def edit_expense(expense_id):
    data = request.json
    result = update_expense(expense_id, data['description'], data['amount'])
    return jsonify(result)

@expenses_bp.route('/<expense_id>', methods=['DELETE'])
def remove_expense(expense_id):
    result = delete_expense(expense_id)
    return jsonify(result)
