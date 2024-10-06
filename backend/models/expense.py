from flask_pymongo import PyMongo

mongo = PyMongo()

def initialize_db(app):
    mongo.init_app(app)

class Expense:
    def __init__(self, description, amount, budget_id):
        self.description = description
        self.amount = amount
        self.budget_id = budget_id

    def save(self):
        return mongo.db.expenses.insert_one(self.__dict__)

    @staticmethod
    def get_all():
        return list(mongo.db.expenses.find())

    @staticmethod
    def update(expense_id, description, amount):
        return mongo.db.expenses.update_one({'_id': expense_id}, {'$set': {'description': description, 'amount': amount}})

    @staticmethod
    def delete(expense_id):
        return mongo.db.expenses.delete_one({'_id': expense_id})
