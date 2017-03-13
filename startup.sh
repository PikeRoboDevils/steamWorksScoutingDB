#!/bin/bash

xterm -hold -e "mongod --dbpath=/home/pi/data --port=9000";

xterm -hold -e cd steamWorksScoutingDB; sudo node index.js;