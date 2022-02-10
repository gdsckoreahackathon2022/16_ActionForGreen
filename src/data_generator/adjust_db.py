import sqlite3
from sqlite3 import Error


def create_table(conn, create_table_sql):
    try:
        c = conn.cursor()
        c.execute(create_table_sql)

    except Error as e:
        print(e)


def create_connection(db_file):
    """ create a database connection to a SQLite database """
    conn = None
    try:
        conn = sqlite3.connect(db_file)
        print(sqlite3.version)
    except Error as e:
        print(e)
    return conn


def create_iot(conn, arg):
    sql = ''' INSERT INTO iot(serial,min,max,transfer_con)
              VALUES(?,?,?,?) '''
    cur = conn.cursor()
    cur.execute(sql, arg)
    conn.commit()
    return cur.lastrowid


def delete_task(conn, id):
    sql = 'DELETE FROM projects WHERE id=?'
    cur = conn.cursor()
    cur.execute(sql, (id,))
    conn.commit()


def select_all_tasks(conn):
    cur = conn.cursor()
    cur.execute("SELECT * FROM iot")
    data = cur.fetchall()
    return data


# def main():
#     conn = create_connection(r"test.db")
#     sql_create_iot_table = """ CREATE TABLE IF NOT EXISTS iot (
#                                             id integer PRIMARY KEY,
#                                             serial integer NOT NULL,
#                                             min integer NOT NULL,
#                                             max integer NOT NULL,
#                                             transfer_con float NOT NULL
#                                         ); """
#     create_table(conn, sql_create_iot_table)
#     cursor = conn.cursor()
#     # 전기=1(kW), 도시가스=2(Nm^3), 자동차 거리=3(km) (탄소 배출량은 연비따라 더 늘어날 수도 있음),
#     # 데이터=4(MB), 일회용품=5(g), 음식물=6(kg), 수도=7(l)
#     cursor.execute("SELECT name FROM sqlite_master WHERE type='table';")
#     print(cursor.fetchall())
#     # [배출량 min, 배출량 max, 단위당 탄소 배출량]
#     dict1= {1: [100, 200, 0.42], 2: [0, 100, 2.2], 3: [0, 300, 0.1],
#             4: [0, 10000, 11], 5: [0, 100, 2.4], 6: [0, 2, 1.65], 7: [100, 200, 0.0033]}
#     for i in range(10):
#         tmp=int(random.random()*1000000)
#         kind=i%6+1
#         arg=(1000000 * kind + tmp, dict1[kind][0], dict1[kind][1], dict1[kind][2])
#         create_iot(conn, arg)
#     print(select_all_tasks(conn))
#     # delete_task(conn, 2)


