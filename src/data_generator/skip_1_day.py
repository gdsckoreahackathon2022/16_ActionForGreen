import adjust_db
import random
import send_api
import d_g_main


def send_data(conn):
    global last_updated
    iot = adjust_db.select_all_tasks(conn)
    print(iot)
    for ind, i in enumerate(iot):
        data = int(random.random() * (i[3] - i[2]) + i[2])
        if ind < len(iot)-3:
            send_api.set_api_body(i[1], data, i[4], 0)
        else:
            send_api.set_api_body(i[1], data, i[4], 1)
    last_updated = len(iot)


conn = adjust_db.create_connection(r"test.db")
d_g_main.add_iot(1, 110000, conn)
d_g_main.add_iot(2, 110001, conn)
d_g_main.add_iot(3, 110002, conn)
# d_g_main.add_iot(3, 100003, conn)
send_data(conn)