import sqlite3
import win
import helper
import func
import json
    



def setupTable(uid):
    con=sqlite3.connect("sumpy.db",timeout=1)
    cursor=con.cursor()
    #cursor.execute("CREATE TABLE finance(uid,balance)")
    cursor.execute("INSERT INTO finance(uid,balance) VALUES(?,?)",[uid,100])
    con.commit()

def setupFinance(uid,balance):
    con=sqlite3.connect("sumpy.db",timeout=1)
    cursor=con.cursor()
    #cursor.execute("CREATE TABLE finance(uid,balance)")
    cursor.execute("INSERT INTO finance(uid,balance) VALUES(?,?)",[uid,balance])
    con.commit()
    print("success")

#writes the bet to the table data
def writeToDatabase(uid,bet,odds,betName,favoriteTeam):
    con=sqlite3.connect("sumpy.db",timeout=2)
    cursor=con.cursor()
    #cursor.execute("CREATE TABLE data3(uid,bet,odds,betName,favoriteTeam)")
    ##deelete the current bets data for the user
    #cursor.execute("DELETE from TABLE where uid=?",(uiud,))
    #odds are dictionary

    cursor.execute("INSERT INTO data3(uid,bet,odds,betName,favoriteTeam) VALUES(?,?,?,?,?)",[uid,bet,odds,betName,favoriteTeam])
    con.commit()
    print("success")



##gets the integer value of money for user account
def requestPayout(uid):
    con=sqlite3.connect("sumpy.db",timeout=1)
    cursor=con.cursor()
    cursor.execute("SELECT balance FROM finance WHERE uid=?",[uid])
    data=cursor.fetchall()
    return data
    


#adds money to the user account
def addMoney(uid,money):
     con=sqlite3.connect("sumpy.db",timeout=1)
     cursor=con.cursor()
     cursor.execute("UPDATE finance SET balance = balance + ? WHERE uid = ?", (money, uid))
     cursor.execute("SELECT balance FROM finance WHERE uid=?",[uid])
     data=cursor.fetchall()
     con.commit()
     return data

#deducts money from user account
def subtractMoney(uid,money):
     con=sqlite3.connect("sumpy.db",timeout=1)
     cursor=con.cursor()
     cursor.execute("UPDATE finance SET balance = balance - ? WHERE uid = ?", (money, uid))
     con.commit()

def calculatePayout(odds,money_amount,bool):
    if bool==True:
        return odds*money_amount


def readData(uid):
    con=sqlite3.connect("sumpy.db",timeout=1)
    cursor=con.cursor()
    cursor.execute("SELECT bet,odds,betName,favoriteTeam FROM data3 WHERE uid=?", (uid,))
    data=cursor.fetchall()
    print(data)
    money_amount=data[0][0]
    team_name=data[0][3]
    matchup=data[0][2]
    dict=data[0][1]
    odds=json.loads(dict)[team_name]
    team1=matchup.split('@')[0]
    team2=matchup.split('@')[1]
    winner=func.win(team1,team2)
    if winner==team_name:
        money_amount=int(money_amount)
        amount_added=calculatePayout(odds,money_amount,True)
        addMoney(uid,amount_added)
        return "Congrats you won your bet"

    else:
        subtractMoney(uid,money_amount)
        return "Whoop you lost"



    

    
    
     

