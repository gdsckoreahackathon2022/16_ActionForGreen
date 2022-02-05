
import json
import requests


def send_api(method, body):
    url = "https://us-central1-hack-9d261.cloudfunctions.net/user/iotInfo"
    body = body
    try:
        headers = {'Content-Type': 'application/json', 'charset': 'UTF-8', 'Accept': '*/*'}
        if method=='put':
            requests.put(url, headers=headers, data=json.dumps(body, ensure_ascii=False, indent="\t"))
        else:
            requests.post(url, headers=headers, data=json.dumps(body, ensure_ascii=False, indent="\t"))
    except Exception as ex:
        print(ex)


def set_api_body(self_adr, data, transfer_con, is_first):
    carbon=int(data * transfer_con)
    if is_first:
        send_api("post", {"carbon": [carbon], "data": [data], "number": str(self_adr)})
        print("serial:", self_adr, data, carbon, "first")
    else:
        send_api("put", {"carbon": carbon, "data": data, "number": str(self_adr)})
        print("serial:", self_adr, data, carbon, "second")
