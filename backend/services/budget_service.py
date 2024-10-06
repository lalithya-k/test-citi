from models.budget import Budget

def create_budget(name, amount):
    budget = Budget(name, amount)
    budget.save()
    return {"message": "Budget created successfully"}, 201

def get_budgets():
    return Budget.get_all()

def update_budget(budget_id, name, amount):
    result = Budget.update(budget_id, name, amount)
    if result.modified_count > 0:
        return {"message": "Budget updated successfully"}, 200
    return {"message": "Budget not found"}, 404

def delete_budget(budget_id):
    result = Budget.delete(budget_id)
    if result.deleted_count > 0:
        return {"message": "Budget deleted successfully"}, 200
    return {"message": "Budget not found"}, 404
