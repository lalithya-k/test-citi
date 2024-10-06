from flask_pymongo import PyMongo

mongo = PyMongo()

def initialize_db(app):
    mongo.init_app(app)

class Budget:
    def __init__(self, name, amount):
        self.name = name
        self.amount = amount

    def save(self):
        return mongo.db.budgets.insert_one(self.__dict__)

    @staticmethod
    def get_all():
        return list(mongo.db.budgets.find())

    @staticmethod
    def update(budget_id, name, amount):
        return mongo.db.budgets.update_one({'_id': budget_id}, {'$set': {'name': name, 'amount': amount}})

    @staticmethod
    def delete(budget_id):
        return mongo.db.budgets.delete_one({'_id': budget_id})
