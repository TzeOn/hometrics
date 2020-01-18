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
weather_data = open("weather.csv", "r")
for entry in weather_data:
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
weather_data.close()
user_data = open("user.csv", "r")
for user in user_data:
    if "#" in user:
        continue
    user = user.rstrip("\n").split(",")
    forename = user[0]
    surname = user[1]
    dob = user[2]
    email_address = user[3]
    password = user[4]
    user_type = user[5]
    confirmation_code = user[6]
    if confirmation_code == "null":
        confirmation_code = None
    sql = "INSERT INTO user (forename, surname, dob, emailAddress, password, type, confirmationCode) VALUES (%s, %s, DATE %s, %s, %s, %s, %s)"
    values = (forename, surname, dob, email_address, password, user_type, confirmation_code)
    cursor.execute(sql, values)
database.commit()