from flask import Flask,jsonify,request
from flask_cors import CORS,cross_origin
import methods
import sqlite3
import helper
import json
from test import pullData
import mail
import requests
import sqlite3

app = Flask(__name__)

CORS(app)
database="sumpy.db"





#writes uiud and phone number and bank account details
@app.route('/',methods=['POST'])
def sendBank():
    data=request.get_json()
    uid=data["uid"]
    phone=data["phone"]
    balance=200
    methods.setupFinance(uid,balance,phone)
    return "success"
    
    
#handle multiple bets for usser

##posts the data from the user and writes to a database
@app.route('/send',methods=['POST','OPTIONS'])
@cross_origin()
def sendUserData():
    data = request.get_json()
    print(data)
    methods.writeToDatabase(data["uid"],data["bet"],data["userTeam"],data["gameID"],data["odds"])
    return "success"



    

##calculates the bets result
@app.route('/addmoney',methods=['GET'])
def send():
    uid=request.args.get('id')
    current_amount=methods.addMoney(uid,10)
    return current_amount


##app route to send the payout

@app.route('/payout',methods=["GET"])
def pay():
    result=requests.get('https://cdn.nba.com/static/json/liveData/scoreboard/todaysScoreboard_00.json')
    list_games=result["scoreboard"]["games"]
    list_gmae_id=[]
    list_uids=[]
    list_emails=[]
    

    for games in list_games:
        list_gmae_id=[]
        list_uids=[]
        list_emails=[]
        ##pull the gameId 
        #using sqlite pull the users with gameId that matches with that gameId 
        #call the win module and then update their account with the money and then send the email using the mail module
        list_gmae_id.append(games["gameId"])
    
    for gameid in list_gmae_id:
        con=sqlite3.connect("sumpy.db",timeout=2)
        cursor=con.cursor()

        cursor.execute("SELECT uid,odds,bet,userTeam FROM data4 WHERE gameId=?",[gameid])
        data=cursor.fetchall()
        list_uids.append(data)
    
        for data in list_uids:
            uid=data[0]
            odds=data[1]
            bet=data[2]
            userTeam=data[3]
            result=pullData(uid=uid) ##gets the result of the matchup
            if result!=1:
                money_to_added=methods.calculatePayout(odds,bet,result)
                current_money=methods.addMoney(money_to_added)

                cursor.execute("SELECT phone FROM finance3 WHERE uid=?",[uid])#selecting the emails
                email=cursor.fetchall()
                mail.send_email(userTeam,bet,current_money,result,email)
                

            



            

    
    
    


    






if( __name__ =='__main__'):
    app.run(debug=True)