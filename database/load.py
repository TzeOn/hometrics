from datetime import datetime
import mysql.connector
import os
import sys

# Connect to database. 
database = mysql.connector.connect(
    user = "hometrics", 
    password = "hometrics", 
    database = "hometrics", 
    auth_plugin = "mysql_native_password"
)
cursor = database.cursor()

# Populate hub data.
hub_data = open(os.path.join(sys.path[0], "hub.csv"), "r")
for hub in hub_data: 
    if "#" in hub:
        continue
    hub = hub.rstrip("\n").split(",")
    hub_id = hub[0]
    password = hub[1]
    thermostat = hub[2]
    humidity = hub[3]
    lighting = hub[4]
    airQuality = hub[5]
    sql = "INSERT INTO hub (id, password, thermostat, humidity, lighting, airQuality) VALUES (%s, %s, %s, %s, %s, %s)"
    values = (hub_id, password, thermostat, humidity, lighting, airQuality)
    cursor.execute(sql, values)
hub_data.close()

# Populate room data. 
room_data = open(os.path.join(sys.path[0], "room.csv"), "r")
for room in room_data: 
    if "#" in room:
        continue
    room = room.rstrip("\n").split(",")
    name = room[0]
    hub = room[1]
    sql = "INSERT INTO room (roomName, hub) VALUES (%s,%s)"
    values = (name,hub)
    cursor.execute(sql, values)
room_data.close()

# Populate weather data. 
weather_data = open(os.path.join(sys.path[0],"weather.csv"), "r")
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
user_data = open(os.path.join(sys.path[0],"user.csv"), "r")
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

# Populate plug data. 
plug_data = open(os.path.join(sys.path[0],"smartPlug.csv"), "r")
for entry in plug_data:
    if "#" in entry:
        continue
    entry = entry.rstrip("\n").split(",")
    id = entry[0]
    roomName = entry[1]
    sql = "INSERT INTO smartPlug (id, roomName) VALUES (%s, %s)"
    values = (id, roomName)
    cursor.execute(sql, values)
plug_data.close()

# Populate device data. 
device_data = open(os.path.join(sys.path[0],"device.csv"), "r")
for entry in device_data:
    if "#" in entry:
        continue
    entry = entry.rstrip("\n").split(",")
    id_ = entry[0]
    name = entry[1]
    plug = entry[2]
    onOff = entry[3]
    energyPerHour = entry[4]
    if onOff == "true": 
        onOff = True 
    else:
        onOff = False
    sql = "INSERT INTO device (id, name, plug, onOff, energyPerHour) VALUES (%s, %s, %s, %s, %s)"
    values = (id_, name, plug,onOff,energyPerHour)
    cursor.execute(sql, values)
device_data.close()

# Populate deviceActivity data. 
deviceActivity_data = open(os.path.join(sys.path[0],"deviceActivity.csv"), "r")
for entry in deviceActivity_data:
    if "#" in entry:
        continue
    entry = entry.rstrip("\n").split(",")
    startTime = entry[0]
    endTime = entry[1]
    device = entry[2]
    user = entry[3]
    sql = "INSERT INTO deviceActivity (startTime, endTime, device, user) VALUES (%s, %s, %s, %s)"
    values = (startTime, endTime, device, user)
    cursor.execute(sql, values)
deviceActivity_data.close()

# Populate device restriction data. 
deviceRestriction_data = open(os.path.join(sys.path[0],"deviceRestriction.csv"), "r")
for entry in deviceRestriction_data:
    if "#" in entry:
        continue
    entry = entry.rstrip("\n").split(",")
    device = entry[0]
    cap = entry[1]
    restricted = entry[2]
    restrictor = entry[3]
    hoursUsed = entry[4]
    sql = "INSERT INTO deviceRestriction (device, cap, restricted, restrictor, hoursUsed) VALUES (%s, %s, %s, %s, %s)"
    values = (device, cap, restricted, restrictor, hoursUsed)
    cursor.execute(sql, values)
deviceRestriction_data.close()

# Commit to MySQL database. 
database.commit()