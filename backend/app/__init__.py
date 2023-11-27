# app/__init__.py
from flask import Flask
from .db import init_db

def create_app():
    app = Flask(__name__)

    # Initialize database
    init_db(app)

    # Register routes
    from . import routes
    app.register_blueprint(routes.bp)

    return app
