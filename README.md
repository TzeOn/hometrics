# Hometrics

## Set up

### Back end
* Make sure you have python3, npm, node, pip3, and mysql installed.
* Set up mysql user hometrics with password hometrics
* make sure they have permissions to create and edit the hometrics table

Then either

* mysql -u hometrics -p < schema.sql
* python3 database/load.py
* node server/main.js

Or

* ./schema.sql

### Front end
* Make sure you've got expo cli installed
* npm start -web
* Type w in terminal
