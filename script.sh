#!/bin/bash
mysql -u hometrics -p < database/schema.sql
echo "schema set up"
python3 database/load.py
echo "database populated"
node server/main.js
