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

CREATE TABLE user (
    forename VARCHAR(255),
    surname VARCHAR(255),
    dob DATE,
    emailAddress VARCHAR(255),
    password VARCHAR(255),
    type VARCHAR(255),
    confirmationCode VARCHAR(255),
    PRIMARY KEY (emailAddress)
);

CREATE TABLE device (
    id VARCHAR(255),
    name VARCHAR(255),
    description VARCHAR(255),
    PRIMARY KEY (id)
);

CREATE TABLE smartPlug (
    id VARCHAR(255),
    location VARCHAR(255),
    pluggedDevice VARCHAR(255),
    PRIMARY KEY (id),
    FOREIGN KEY (pluggedDevice) REFERENCES device(id)
);

CREATE TABLE deviceActivity (
    startTime DATE,
    endTime DATE,
    energy REAL,
    device VARCHAR(255),
    user VARCHAR(255),
    FOREIGN KEY (device) REFERENCES device(id),
    FOREIGN KEY (user) references user(emailAddress)
);

CREATE TABLE deviceRestriction (
    device VARCHAR(255),
    restriction INT,
    restricted VARCHAR(255),
    restrictor VARCHAR(255),
    hoursUsed INT
)