#!/bin/bash
mysql -u hometrics -p < schema.sql
python3 load.py
