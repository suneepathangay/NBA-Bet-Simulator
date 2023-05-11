
import sqlite3
import requests
import json




def pullData():
    
    con=sqlite3.connect("sumpy.db",timeout=1)
    cursor=con.cursor()
    cursor.execute("SELECT uid FROM data3")
    data=cursor.fetchall()
    
    for uid in data:
        #print(uid[0])
        uid=uid[0]
        cursor.execute("SELECT gameId,favoriteTeam FROM data3 WHERE uid=?",[uid])
        user_id=cursor.fetchall()
        favoriteTeam=user_id[0][1]
        gameId=user_id[0][0]
        ##write code to pull 
        #send request using the nba api to get the games 
        #loop through the games and get the status if status says final add the game id to a list of completed games
        ##if the gameid associated with the user is in the final 
        #continue looping though json to get the winner using the score attribute
        data=requests.get('https://cdn.nba.com/static/json/liveData/scoreboard/todaysScoreboard_00.json')
        data=json.loads(data.text)
        list_data=data["scoreboard"]["games"]
        print(list_data)

        dicts={}
        for games in list_data:
            game_id=games["gameId"]
            
            #link the id to the outcome as a dictionary

            #checks if the game is over
            if games["gameStatus"]==3:
                #checks 
                if games["homeTeam"]["score"]>=games["awayTeam"]["score"]:
                    print("home team victory")
                    dicts[game_id]=games["homeTeam"]["teamCity"]+ " "+games["homeTeam"]["teamName"]
                else:
                    print("away team victory")
                    dicts[game_id]=games["awayTeam"]["teamCity"]+ " "+games["awayTeam"]["teamName"]
        print(dicts)

        if game_id in dicts:
            winning_tema=dicts[game_id]
            if winning_tema==favoriteTeam:
                return True
            else:
                return False

pullData()


