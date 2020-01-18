from datetime import datetime
import mysql.connector 
database = mysql.connector.connect(
    user = "hometrics", 
    password = "hometrics", 
    database = "hometrics", 
    auth_plugin = "mysql_native_password"
)
cursor = database.cursor()
print(database)
dataset = open("weather.csv", "r")
print(start_time)
for entry in dataset:
    if "#" in entry:
        continue
    entry = entry.rstrip('\n').split(",")
    time = entry[0]
    humidity = float(entry[1])
    temperature = float(entry[2])
    lighting = float(entry[3])
    air_quality = int(entry[4])
    sql = "INSERT INTO weather (time, humidity, temperature, lighting, airQuality) VALUES (%s, %s, %s, %s, %s)"
    values = (time, humidity, temperature, lighting, air_quality)
    cursor.execute(sql, values)
database.commit()
print("Loaded data.")