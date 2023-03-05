import sqlite3
import win
    


def calculateAmount(bet,odds):
    if(win.determineWinner()==False):
        return 0
    else:
       return bet*odds
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
    cursor.execute("SELECT balance FROM finance WHERE uid=?",(uid,))
    cursor.execute("INSERT INTO finance(uid,balance) VALUES(?,?)",["Suneet",100])
    cursor.execute("SELECT balance FROM finance WHERE uid=?",[uid])
    result=cursor.fetchone()
    return str(result[0])

#adds money to the user account
def addMoney(uid,money):
     con=sqlite3.connect("sumpy.db",timeout=1)
     cursor=con.cursor()
     cursor.execute("UPDATE finance SET balance = balance + ? WHERE uid = ?", (money, uid))
     con.commit()

#deducts money from user account
def subtractMoney(uid,money):
     con=sqlite3.connect("sumpy.db",timeout=1)
     cursor=con.cursor()
     cursor.execute("UPDATE finance SET balance = balance - ? WHERE uid = ?", (money, uid))
     con.commit()
    
     

