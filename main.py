from selenium import webdriver
from selenium.webdriver.common.by import By

def getScores():
    driver = webdriver.Chrome()
    driver.get("https://www.google.com/search?q=nba+games&oq=nba+games")

    test = driver.find_element(By.XPATH,'//*[@id="sports-app"]/div/div[3]/div/div/table').text
    array_info = test.split()
    for info in array_info:
        if(info == "-" or info=="►"):
            array_info.remove(info)

    dictionary = {}
    for i in range(len(array_info)):
        element = array_info[i]
        if(element == "Final" or element=="Final/OT"):
            if(array_info[i+1] == "Today"):
                team1Name = array_info[i+4]
                team2Name = array_info[i+7]
                if(team1Name == "Trail"):
                    team1Name = "Trail Blazers"
                    team2Name = array_info[i+9]
                    dictionary[team1Name] = array_info[i+3]
                    dictionary[team2Name] = array_info[i+8]
                elif(team2Name == "Trail"):
                    team2Name = "Trail Blazers"
                    dictionary[team1Name] = array_info[i+3]
                    dictionary[team2Name] = array_info[i+6]
                else:
                    dictionary[team1Name] = array_info[i+3]
                    dictionary[team2Name] = array_info[i+6]
    return dictionary

def returnWinner(team1,team2):
    scoresheet = getScores()
    try :
        team1Score = int(scoresheet[team1])
    except:
        return "Game isn't completed"
    try:
        team2Score = int(scoresheet[team2])
    except:
        return "Game isn't completed"
    if(team1Score>team2Score):
        return team1
    elif(team1Score<team2Score):
        return team2



scoresheet = getScores()
with open("pastScores.txt",'a') as f:
    f.write(str(scoresheet)+ "\n")


'''
//*[@id="sports-app"]/div/div[3]/div/div/table/tbody/tr[1]/td[1]/div/div/div/table - FULL TABLE
//*[@id="sports-app"]/div/div[3]/div/div/table/tbody/tr[1]/td[1]/div/div/div/table/tr[5]/td[2]/div[2]/span3
'''