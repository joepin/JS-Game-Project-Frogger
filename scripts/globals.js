var gridSize = 17;
var timer = 0;
var timerID = null;
var $curPos = null;
var $mainContainer = null;
var $body = null;
var genID = null;
var moveTrucksID = null;
var checkTrucksID = null;
var numTrucks = 0;
var allTrucks = [];
var maxTrucks = 10;
var allLogs = {};
var maxLogs = 15;
var numLogs = 0;

var moveLogsID = null;
var checkLogsID = null;
var totTrucks = 0;
var totLogs = 0;

function getRandom(range, offset) {
  return (Math.floor((Math.random() * range) + offset));
}
