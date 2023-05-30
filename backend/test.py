
import sqlite3
import requests
import json
import datetime

##change pull data so we pull by date instead of uid


##change it so the sqlite databse gets updated when the user signs back in

def pullData(uid):
        today=datetime.date.today()
        
        date=str(today)

        def getEmail(uid):
            con=sqlite3.connect("sumpy.db",timeout=2)
            cursor=con.cursor()

            cursor.execute("SELECT phone FROM finance3 WHERE uid=?",[uid])
            data=cursor.fetchall()
            return data    
        



        con=sqlite3.connect("sumpy.db",timeout=2)
        cursor=con.cursor()
    
    
        
        cursor.execute("SELECT gameId,userTeam,bet,odds,uid,state,points FROM data6 WHERE date=? AND uid=?",[date,uid])
        
        data=cursor.fetchone()
        
    
        print(data)

        ##o is under 1 is over
        
        over_under=data[5]
        points=data[6]
        ##get the list of gameIds going on rn

        

        email=getEmail(uid)
        email=email[0]
        

       ##get the winners of the games
        matches=requests.get('https://cdn.nba.com/static/json/liveData/scoreboard/todaysScoreboard_00.json')
        
        games=matches.json()["scoreboard"]["games"]
        for game in games:
            teams=[]
            winner=None
            if data[0]==game["gameId"]:
                if game["gameStatus"]==3:

                    teams.append(game["homeTeam"]['teamTricode'])
                    teams.append(game["awayTeam"]["teamTricode"])
                    
                    if game["homeTeam"]["score"]>game["awayTeam"]["score"]:
                        winner=teams[0]
                    else:
                        winner=teams[1]
            if winner:
                if data[1]==winner:
                        if over_under==0:
                            sums=game["homeTeam"]["score"]+game["awayTeam"]["score"]
                            if sums<points:
                                return (True,email,data[2],data[3])
                            else:
                                return (False,email,data[2],data[3])
                        if over_under==1:
                            sums=game["homeTeam"]["score"]+game["awayTeam"]["score"]
                            if sums>points:
                                return (True,email,data[2],data[3])
                            else:
                                return (False,email,data[2],data[3])

                        
                else:
                    print(data[2],data[3])
                    return (False,email,data[2],data[3])

        
            
        

val=pullData('F8bN3qyV0mayhf1UB5kYaDUBhSf2')
print(val)


            

