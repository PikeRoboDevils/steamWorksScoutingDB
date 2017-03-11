#!/bin/bash

mongo --port=9000 < aggregate.js

mongoexport --port=9000 --db=steamworks --collection=temp --fieldFile=./aggregateFields.txt --csv --out=./data.csv

mongo --port=9000 < clearTemp.js

# mongoexport --port=9000 --db=steamworks --collection=wlPlayoffs --fieldFile=./fields.txt --csv --out=./data.csv
