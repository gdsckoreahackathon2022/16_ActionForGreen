import string
import requests
import send_api
import adjust_db
import random
import json

# 전기=1(kW), 도시가스=2(Nm^3), 자동차 거리=3(km),
# 데이터=4(MB), 일회용품=5(g), 음식물=6(kg), 수도=7(l)
dict1 = {1: [100, 200, 14], 2: [0, 5, 2200], 3: [0, 200, 100],
         4: [0, 10000, 11], 5: [0, 100, 2.4], 6: [0, 3, 1650], 7: [100, 200, 3.3]}
last_updated = 0


def send_data(conn):
    global last_updated
    iot = adjust_db.select_all_tasks(conn)
    print(iot)
    for ind, i in enumerate(iot):
        data = int(random.random() * (i[3] - i[2]) + i[2])
        if ind < last_updated:
            send_api.set_api_body(i[1], data, i[4], 0)
        else:
            send_api.set_api_body(i[1], data, i[4], 1)
    last_updated = len(iot)


def add_iot(kind, number, conn):
    arg = (1000000 * kind + number, dict1[kind][0], dict1[kind][1], dict1[kind][2])
    adjust_db.create_iot(conn, arg)


def set_user_serial(email, data):
    body = {"email": email, "serial": data}
    url = "https://us-central1-hack-9d261.cloudfunctions.net/user/addUserNoToken"
    headers = {'Content-Type': 'application/json', 'charset': 'UTF-8', 'Accept': '*/*'}
    requests.post(url, headers=headers, data=json.dumps(body, ensure_ascii=False, indent="\t"))


def main():
    conn = adjust_db.create_connection(r"test.db")
    sql_create_iot_table = """ CREATE TABLE IF NOT EXISTS iot (
                                                id integer PRIMARY KEY,
                                                serial integer NOT NULL,
                                                min integer NOT NULL,
                                                max integer NOT NULL,
                                                transfer_con float NOT NULL
                                            ); """
    adjust_db.create_table(conn, sql_create_iot_table)
    serial_numbers = {}

    for i in range(10):
        num_registered_people=int(random.random()*3)
        for k in range(num_registered_people):
            email=''.join(random.choice(string.ascii_uppercase + string.digits) for _ in range(10))
            email+='@fake.com'
            num_serial=int(random.random()*4)+1
            serials=[]
            for j in range(num_serial):
                kind=int(random.random()*7)+1
                temp_serial = int(random.random() * 1000000)
                while temp_serial in serial_numbers:
                    temp_serial = int(random.random() * 1000000)
                serial_numbers[temp_serial] = 0
                add_iot(kind, temp_serial, conn)
                serials.append(kind*1000000+temp_serial)
            set_user_serial(email,serials)
        send_data(conn)
    for i in range(10):
        print("----------------",i,"------------------")
        send_data(conn)

    # add iot manually, and skip one day



if __name__ == "__main__":
    main()
