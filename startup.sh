#!/bin/bash

xterm -hold -e "mongod --dbpath=/home/pi/data --port=9000"

sudo node index.js;