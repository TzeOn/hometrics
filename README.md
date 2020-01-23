# Hometrics

## Set up

### Dependancies
* python3
* npm
* node
* pip3
* expo-cli
* mysql

### Backend
* Set up mysql user hometrics with password hometrics
* make sure they have permissions to create and edit the hometrics table

Then either

* mysql -u hometrics -p < database/schema.sql
* python3 database/load.py
* node server/main.js

Or

* ./schema.sql

### Frontend
* npm start -web in frontend directory
* Type w in terminal
