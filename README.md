### Exporting Data:
1. Open a terminal
2. Start a mongo client with `mongod --dbpath=/home/pi/data --port=9000`
3. With the mongo client running, open a new terminal
4. In the new terminal navigate into the `steamWorksScoutingDB` project with `cd steamWorksScoutingDB`
5. Run the export.sh shell script `./export.sh`

**NOTE:** [Line 5 of export.sh](https://github.com/PikeRoboDevils/steamWorksScoutingDB/blob/master/export.sh#L5) sets the output location to flashdrive named `DATADRIVE`. This may need to be changed depending on the application.





![Alt text](./dbDiagram.png?raw=true "Optional Title")
