import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from email.mime.base import MIMEBase
from email import encoders

def send_email(team_bet,money_bet,amount_money_left,win_status,email):
    message=""

    if win_status==True:
        message=f"Your bet with the {team_bet} for {money_bet} has hit. You now have {amount_money_left} "
    else:
        message=f"Your bet with the {team_bet} for {money_bet} has lost. You now have {amount_money_left}"
    # create SMTP session
    s = smtplib.SMTP('smtp.gmail.com', 587)
    s.starttls()

    # login to email account
    s.login("suneetpathangay@gmail.com", "prtrmasptvjuitlx")

    # create message
    msg = MIMEMultipart()
    msg['From'] = "suneet pathangay👻 <suneetpathangay@gmail.com>"
    msg['To'] = email
    msg['Subject'] = "Your Bet Has Hit"
    body = message
    msg.attach(MIMEText(body, 'plain'))

    # send email
    s.sendmail("suneetpathangay@gmail.com", "suneetpathangay@gmail.com", msg.as_string())

    # terminate session
    s.quit()

send_email("lakers",40,23)
