import sqlite3
import helper
import json
from flask import jsonify


def determineWinner(uid):
    con=sqlite3.connect("sumpy.db",timeout=1)
    cursor=con.cursor()
    cursor.execute("SELECT * FROM data3")
    result=cursor.fetchall()
    return jsonify(result)
    


