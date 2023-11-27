# app/db.py
from flask import current_app, g
import mysql.connector
import os
from dotenv import load_dotenv

load_dotenv()

def get_db():
    if 'db' not in g:
        g.db = mysql.connector.connect(
            host= 'mysql-db',
            user=os.getenv("MYSQL_USER"),
            password=os.getenv("MYSQL_PASSWORD"),
            database=os.getenv("MYSQL_DATABASE"),
        )
    return g.db

def close_db(e=None):
    db = g.pop('db', None)

    if db is not None:
        db.close()

def init_db(app):
    app.teardown_appcontext(close_db)
