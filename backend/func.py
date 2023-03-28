
import requests
import random


def win(team1,team2):

    list_matchup=[team1,team2]
    
    index=random.randrange(0,2)

    print(list_matchup[index])

    return list_matchup[index]





