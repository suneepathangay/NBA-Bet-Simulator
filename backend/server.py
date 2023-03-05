from flask import Flask,jsonify,request
from flask_cors import CORS
import methods
import sqlite3
import json
import win

app = Flask(__name__)
CORS(app)

database="sumpy.db"

#def create_pool():
    #global pool 
    #pool=sqlite3.connect(database,)




#writes uiud and bank account details
@app.route('/',methods=['POST'])
def sendBank():
    data=request.json
    uid=data["uid"]
    balance=200
    methods.setupFinance(uid,balance)
    
    
#handle multiple bets for usser

##posts the data from the user and writes to a database
@app.route('/send',methods=['POST'])
def sendUserData():
    data = request.get_json()
    odds=data["odds"]
    odds=json.dumps(odds)
    bet=data["bet"]
    betName=data["betName"]
    favoriteTeam=data["favorite"]
    uid=data["uid"]
    #adds money to user account also
    methods.writeToDatabase(uid,bet,odds,betName,favoriteTeam)
    
    return "good"

#requests the payout from the database and shows the user the money in their account
@app.route('/get',methods=['GET'])
def requestPayout():
    uid=request.args.get('uid')
    if(uid==None):
        return "You are not logged in"
    else:
        payout=methods.requestPayout(uid)
        return payout

##calculates the bets result
@app.route('/calculate',methods=['GET'])
def send():
    uid=request.args.get('uid')
    return win.determineWinner(uid)

if (__name__ =='__main__'):
    app.run(debug=True)