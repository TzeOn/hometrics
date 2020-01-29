DROP DATABASE IF EXISTS hometrics; 
CREATE DATABASE hometrics; 
USE hometrics;

CREATE TABLE weather (
    time VARCHAR(255),
    humidity REAL,
    temperature REAL,
    lighting REAL,
    airQuality INT,
    PRIMARY KEY (time)
);

CREATE TABLE room ( 
    roomName VARCHAR(255), 
    PRIMARY KEY (roomName)
);

CREATE TABLE light ( 
    id VARCHAR(255),  
    roomName VARCHAR(255), 
    PRIMARY KEY (id), 
    FOREIGN KEY (roomName) REFERENCES room(roomName)
);

CREATE TABLE hub (
    id VARCHAR(255),  
    password VARCHAR(255), 
    PRIMARY KEY(id)
);

CREATE TABLE user (
    forename VARCHAR(255),
    surname VARCHAR(255),
    dob DATE,
    emailAddress VARCHAR(255),
    password VARCHAR(255),
    type VARCHAR(255),
    confirmationCode VARCHAR(255),
    hub VARCHAR(255),
    PRIMARY KEY (emailAddress),
    FOREIGN KEY (hub) REFERENCES hub(id)
);

CREATE TABLE smartPlug (
    id VARCHAR(255),
    roomName VARCHAR(255),
    hub VARCHAR(255),
    PRIMARY KEY (id),
    FOREIGN KEY (hub) REFERENCES hub(id), 
    FOREIGN KEY (roomName) references room(roomName)
);

CREATE TABLE device (
    id VARCHAR(255),
    name VARCHAR(255),
    plug VARCHAR(255),
    onOff BOOLEAN,
    energyPerHour INT,
    PRIMARY KEY (id),
    FOREIGN KEY (plug) REFERENCES smartPlug(id)
);

CREATE TABLE deviceActivity (
    startTime REAL,
    endTime REAL,
    device VARCHAR(255),
    user VARCHAR(255),
    FOREIGN KEY (device) REFERENCES device(id),
    FOREIGN KEY (user) references user(emailAddress)
);

CREATE TABLE deviceRestriction (
    device VARCHAR(255),
    cap INT,
    restricted VARCHAR(255),
    restrictor VARCHAR(255),
    hoursUsed INT,
    FOREIGN KEY (device) REFERENCES device(id),
    FOREIGN KEY (restrictor) REFERENCES user(emailAddress),
    FOREIGN KEY (restricted) REFERENCES user(emailAddress)
);

CREATE TABLE comfort (
    thermostat REAL,
    hub VARCHAR(255), 
    PRIMARY KEY (hub), 
    FOREIGN KEY (hub) REFERENCES hub(id)
);