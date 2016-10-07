var gridSize = 17;
var $curPos = null;
var $mainContainer = null;
var $body = null;
var genID = null;
var moveTrucksID = null;
var checkTrucksID = null;
var numTrucks = 0;
var allTrucks = {};
var maxTrucks = 10;
var allLogs = {};
var maxLogs = 15;
var numLogs = 0;

var moveLogsID = null;

function getRandom(range, offset) {
  return (Math.floor((Math.random() * range) + offset));
}
