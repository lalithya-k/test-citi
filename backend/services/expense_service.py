from models.expense import Expense

def create_expense(description, amount, budget_id):
    expense = Expense(description, amount, budget_id)
    expense.save()
    return {"message": "Expense created successfully"}, 201

def get_expenses():
    return Expense.get_all()

def update_expense(expense_id, description, amount):
    result = Expense.update(expense_id, description, amount)
    if result.modified_count > 0:
        return {"message": "Expense updated successfully"}, 200
    return {"message": "Expense not found"}, 404

def delete_expense(expense_id):
    result = Expense.delete(expense_id)
    if result.deleted_count > 0:
        return {"message": "Expense deleted successfully"}, 200
    return {"message": "Expense not found"}, 404
