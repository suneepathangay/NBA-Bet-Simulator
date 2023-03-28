# GamblingRecover
App to helping gambling addicts recover though simulated sports betting. Frontend for the application was built in React.js. Backend for the application was built in Python/Flask. The frontend is located at suneet-pathangay-patch1 and backend at patch2. Built in collaboration with Shoumik Majumdar.

How The Program Works

Initially we reverse engineered an NBA API to get the upcoming matches. However we switched a prebuilt RAPID API for consistent data. The user would login/signup and a Firebase uid would be assigned to the user. The uid, matchup,bet, and odds would be written to a sqlite datbase through the Flask Python backend. In the methods file are the functions used to write/read/process the JSON data from the database. Additionally, the functions to determine, the winner of the matchup are included. 

After waiting for a day, the user will be able to request the payout and a message will be displayed on the page whether the won or lost the bet along with the money, they recieved or lost from the bet.

Things We Might Add:

We might improve the user authentication by directly signing in with Google. 

