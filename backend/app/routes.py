# app/routes.py
from flask import Blueprint
from .db import get_db

bp = Blueprint('routes', __name__)

@bp.route('/')
def hello_world():
    db = get_db()
    cursor = db.cursor()
    cursor.execute('SELECT "Hello, World!"')
    message = cursor.fetchone()[0]
    return message
