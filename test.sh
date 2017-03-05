#!/bin/bash

cat ./fields.txt

# mongoexport --db=steamworks --collection=westLafayette --fieldFile=./fields.txt --type=csv --out=./data.csv