import sys
import os
sys.path.append(os.path.dirname(os.path.abspath(__file__)))
from flask import Flask, jsonify
from flask_cors import CORS
from api.budgets import budgets_bp
from api.expenses import expenses_bp
from api.auth import auth_bp
from database.db import initialize_db

app = Flask(__name__)
CORS(app)

CORS(app, resources={r"/*":{"origins": "http://localhost:5173",
"methods":["GET","POST","DELETE","OPTIONS"]
}})

def example():
    if flask.request.method == 'OPTIONS':
        response = flask.make_response(jsonify({'message':'CORS Preflight OK'}), 200)
        response.headers["Access-Control-Allow-Origin"]= "http://localhost:5173"
        response.headers["Access-Control-Allow-Methods"]= "GET, POST, OPTIONS"
        response.headers["Access-Control-Allow-Headers"]= "Content-Type, Authorization"
        response.headers.add("Access-Control-Allow-Headers","Content-Type,Authorization")
        return response

    return jsonify({"message":"CORS and preflight configured"})   




# Configuration for MongoDB
app.config['MONGO_URI'] = 'mongodb://localhost:27017/budget_app'  # Update with your MongoDB URI
initialize_db(app)

# Register Blueprints
app.register_blueprint(budgets_bp, url_prefix='/api/budgets')
app.register_blueprint(expenses_bp, url_prefix='/api/expenses')
app.register_blueprint(auth_bp, url_prefix='/api/auth')

if __name__ == "__main__":
    app.run(debug=True)