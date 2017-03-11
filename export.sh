#!/bin/bash

# cat ./fields.txt

mongoexport --port=9000 --db=steamworks --collection=wlPlayoffs --fieldFile=./fields.txt --csv --out=./data.csv