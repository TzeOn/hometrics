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
    sql = "INSERT INTO hub (id, password) VALUES (%s, %s)"
    values = (hub_id, password)
    cursor.execute(sql, values)
hub_data.close()

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

# Populate comfort data. 
comfort_data = open(os.path.join(sys.path[0],"comfort.csv"), "r")
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

# Populate plug data. 
plug_data = open(os.path.join(sys.path[0],"smartPlug.csv"), "r")
for entry in plug_data:
    if "#" in entry:
        continue
    entry = entry.rstrip("\n").split(",")
    id = entry[0]
    location = entry[1]
    hub = entry[2]
    sql = "INSERT INTO smartPlug (id, location, hub) VALUES (%s, %s, %s)"
    values = (id, location, hub)
    cursor.execute(sql, values)
plug_data.close()


# Populate device data. 
device_data = open(os.path.join(sys.path[0],"device.csv"), "r")
for entry in device_data:
    if "#" in entry:
        continue
    entry = entry.rstrip("\n").split(",")
    id = entry[0]
    name = entry[1]
    owner = entry[2]
    plug = entry[3]
    sql = "INSERT INTO device (id, name, owner, plug) VALUES (%s, %s, %s, %s)"
    values = (id, name, owner, plug)
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
    energy = entry[2]
    device = entry[3]
    user = entry[4]
    sql = "INSERT INTO deviceActivity (startTime, endTime, energy, device, user) VALUES (%s, %s, %s, %s, %s)"
    values = (startTime, endTime, energy, device, user)
    cursor.execute(sql, values)
deviceActivity_data.close()



# Populate device restriction data. 
deviceRestriction_data = open(os.path.join(sys.path[0],"deviceRestriction.csv"), "r")
for entry in deviceRestriction_data:
    if "#" in entry:
        continue
    entry = entry.rstrip("\n").split(",")
    print(entry)
    device = entry[0]
    restriction = entry[1]
    restricted = entry[2]
    restrictor = entry[3]
    hoursUsed = entry[4]
    sql = "INSERT INTO deviceRestriction (device, restriction, restricted, restrictor, hoursUsed) VALUES (%s, %s, %s, %s, %s)"
    values = (device, restriction, restricted, restrictor, hoursUsed)
    cursor.execute(sql, values)
deviceRestriction_data.close()

# Commit to MySQL database. 
database.commit()
