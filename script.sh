#!/bin/bash
mysql -u hometrics -p < database/schema.sql
python3 database/load.py
