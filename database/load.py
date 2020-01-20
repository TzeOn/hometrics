from datetime import datetime
import mysql.connector

# Connect to database. 
database = mysql.connector.connect(
    user = "hometrics", 
    password = "hometrics", 
    database = "hometrics", 
    auth_plugin = "mysql_native_password"
)
cursor = database.cursor()

# Populate hub data.
hub_data = open("hub.csv", "r")
for hub in hub_data: 
    if "#" in hub:
        continue
    hub = hub.rstrip("\n").split(",")
    hub_id = hub[0]
    password = hub[1]
    sql = "INSERT INTO hub (id, password) VALUES (%s, %s)"
    values = (hub_id, password)
    cursor.execute(sql, values)
hub_data.close()

# Populate weather data. 
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

# Populate user data. 
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
    hub = user[7]
    if confirmation_code == "null":
        confirmation_code = None
    sql = "INSERT INTO user (forename, surname, dob, emailAddress, password, type, confirmationCode, hub) VALUES (%s, %s, DATE %s, %s, %s, %s, %s, %s)"
    values = (forename, surname, dob, email_address, password, user_type, confirmation_code, hub)
    cursor.execute(sql, values)
user_data.close()

# Populate comfort data. 
comfort_data = open("comfort.csv", "r")
for entry in comfort_data:
    if "#" in entry:
        continue
    entry = entry.rstrip("\n").split(",")
    thermostat = int(entry[0])
    hub = entry[1]
    sql = "INSERT INTO comfort (thermostat, hub) VALUES (%s, %s)"
    values = (thermostat, hub)
    cursor.execute(sql, values)
comfort_data.close()

# Commit to MySQL database. 
database.commit()
