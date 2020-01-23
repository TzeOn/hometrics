# Hometrics

## Set up

### Dependancies
* python3
* npm
* node
* pip3
* expo-cli
* mysql

### Back end
* Set up mysql user hometrics with password hometrics
* make sure they have permissions to create and edit the hometrics table

Then either

* mysql -u hometrics -p < database/schema.sql
* python3 database/load.py
* node server/main.js

Or

* ./schema.sql

### Front end
* npm start -web in front end directory
* Type w in terminal
