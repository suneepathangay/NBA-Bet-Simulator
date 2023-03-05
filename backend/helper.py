
def formatTeams(string):
    lists=string.split('@')


    list_nba_teams=["Trail Blazers","Magic","Hawks","Celtics","Nets","Hornets","Bulls","Cavaliers","Mavericks","Pelicans","Nuggets",
               "Pistons","Warriors","Rockets","Pacers","Clippers","Lakers","Grizzlies","Heat","Bucks","Timberwolves","Pelicans",
               "Knicks","Thunder","Magic","76ers","Suns","Kings","Spurs","Raptors","Jazz","Wizards"]
    list1=lists[0].split(' ')
    list2=lists[1].split(' ')
    team1=""
    team2=""
    for team in list1:
        if(team in list_nba_teams):
            team1=team
    for team in list2:
        if(team in list_nba_teams):
            team2=team
    return team1,team2