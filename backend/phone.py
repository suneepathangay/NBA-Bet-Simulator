
import requests
import json




url='https://us.sms.api.sinch.com/xms/v1'



def get_acces_token():
    with open("tokens.txt","r") as f:
        return f.read()

token=get_acces_token()
service_plan_id='ea27e474113e4b4784f8ab7eab818595'
from_="12064743972"
to_="15087336445"

headers={
    "Authorization":f"Bearer {token}",
    "Content-Type":"application/json"
}

payload={
    "from":from_,
    "to":[to_],
    "body":"hello "
}


result=requests.post(
    f'https://us.sms.api.sinch.com/xms/v1{service_plan_id}/batches',
    headers=headers,
    data=json.dumps(payload)
)