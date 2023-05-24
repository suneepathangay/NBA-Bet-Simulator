import sqlite3
import datetime
import pytz
import time
import send_emails



def execute_at_3am(func):
    eastern = pytz.timezone('US/Eastern')

    while True:
        current_time = datetime.datetime.now(eastern)
        if current_time.hour == 3 and current_time.minute == 0:
            func()  # Execute the provided function
            time.sleep(60)  # Wait for 1 minute before checking again
        else:
            print("not time yet")
            time.sleep(60)  # Wait for 1 minute before checking again

# Example usage
def my_function():
    print("Executing function at 3 AM Eastern Time!")

while True:
    execute_at_3am(send_emails.send_emails)