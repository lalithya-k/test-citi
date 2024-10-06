from flask import Blueprint, request, jsonify
from services.budget_service import create_budget, get_budgets, update_budget, delete_budget

budgets_bp = Blueprint('budgets', __name__)

@budgets_bp.route('/', methods=['POST'])
def add_budget():
    data = request.json
    result = create_budget(data['name'], data['amount'])
    return jsonify(result), 201

@budgets_bp.route('/', methods=['GET'])
def list_budgets():
    result = get_budgets()
    return jsonify(result)

@budgets_bp.route('/<budget_id>', methods=['PUT'])
def edit_budget(budget_id):
    data = request.json
    result = update_budget(budget_id, data['name'], data['amount'])
    return jsonify(result)

@budgets_bp.route('/<budget_id>', methods=['DELETE'])
def remove_budget(budget_id):
    result = delete_budget(budget_id)
    return jsonify(result)
