from flask import Flask,jsonify,request
from flask_cors import CORS,cross_origin
import methods
import sqlite3
import helper
import json
import win

app = Flask(__name__)

CORS(app)
database="sumpy.db"





#writes uiud and bank account details
@app.route('/',methods=['POST'])
def sendBank():
    data=request.get_json()
    uid=data["uid"]
    balance=200
    methods.setupFinance(uid,balance)
    return "success"
    
    
#handle multiple bets for usser

##posts the data from the user and writes to a database
@app.route('/send',methods=['POST','OPTIONS'])
@cross_origin()
def sendUserData():
    data = request.get_json()
    odds=data["odds"]
    odds=json.dumps(odds)
    bet=data["bet"]
    betName=data["betName"]
    favoriteTeam=data["favorite"]
    uid=data["uiud"]
    #adds money to user account also
    methods.writeToDatabase(uid,bet,odds,betName,favoriteTeam)
    return "good"

#requests the payout from the database and shows the user the money in their account
@app.route('/balance',methods=['GET'])
def requestPayout():
    data=request.args.get('id')
    balance=methods.requestPayout(data)
    return balance
    

##calculates the bets result
@app.route('/addmoney',methods=['GET'])
def send():
    uid=request.args.get('id')
    current_amount=methods.addMoney(uid,10)
    return current_amount


@app.route('/outcome',methods=['GET'])
def sendResult():
    uid=request.args.get('id')
    message=methods.readData(uid)
    return message
   

    
    
    


    






if (__name__ =='__main__'):
    app.run(debug=True)