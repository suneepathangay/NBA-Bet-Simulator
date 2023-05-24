import sqlite3
import requests
import json
import test
import mail
import methods

def send_emails():


    con=sqlite3.connect("sumpy.db",timeout=1)
    cursor=con.cursor()
    cursor.execute("SELECT uid FROM data4")
    data=cursor.fetchall()

    
    ##getting all the uids
    for uids in data:
        ##checking all the uids
        result=test.pullData(uids[0])
        
        if result:
            balance=float('inf')
            money=methods.calculatePayout(result[3],result[2],result[0])
            if result[0]==True:
                money_left=methods.addMoney(uids[0],money)
                if money_left:
                    balance=money_left[0][0]
            if result[0]==False:
                money_left=methods.subtractMoney(uids[0],result[2])
                if money_left:
                    balance=money_left[0][0]
            if balance!=float('inf'):
                cursor.execute("SELECT phone FROM finance3 WHERE uid=? AND phone IS NOT NULL",[uids[0]])
                email=cursor.fetchall()
                #print(email)
                if email:
                    emails=email[0][0]
                    
                    mail.send_email(result[1],result[2],balance,result[0],emails)

send_emails()                



