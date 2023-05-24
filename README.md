# GamblingRecover
App to helping gambling addicts recover though simulated sports betting. Frontend for the application was built in React.js. Backend for the application was built in Python/Flask. The frontend is located at suneet-pathangay-patch1 and backend at patch2. Built in collaboration with Shoumik Majumdar.

How The Program Works

This was a project me and Shoumik started a while ago. However, it was completely redone. Firstly, the UI/UX was completely redone. Secondly, I cancelled all of our prebuilt API's from RapidApi and started rebuilding this from ground up. Instead of using the prebuilt API's the NBA API(can be found under the API folder) were reverse engineered to bet the current games of the week. The Draft Kings API was also reverse engineered to get the odds of each matchup. The NBA API was then reversed again to get the outcome of the matchup.
The tech was still the same as we used React.js/Next.js for the frontend and Flask for the backend. We also set up a Sinch server in which the user will be alerted as to to when their bet hits.

Update:
Fully finished the app. Included popup for direct google sign in/sign up authentication

