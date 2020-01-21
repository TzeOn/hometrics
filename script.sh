#!/bin/bash
mysql -u hometrics -p < database/schema.sql
echo "ok done"
python3 database/load.py
node server/main.js
