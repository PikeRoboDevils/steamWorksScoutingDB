#!/bin/bash

mongo --port=9000 < aggregate.js

mongoexport --port=9000 --db=steamworks --collection=temp --fieldFile=./aggregateFields.txt --type=csv --out=/media/pi/DATADRIVE/data.csv

mongo --port=9000 < clearTemp.js
