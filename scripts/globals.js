var gridSize = 17;
var timer = 0;

// references to important HTML elements
var $mainContainer = null;
var $body = null;

// variables to help motion of frogger
var $curPos = null;
var onLog = false;
var $currLog = null;

// variables to hold current state of trucks
var numTrucks = 0;
var maxTrucks = 10;
var allTrucks = [];

// variables to hold current state of logs
var numLogs = 0;
var maxLogs = 20;
var allLogs = [];

// ID's from setInterval calls
var timerID = null;
var moveTrucksID = null;
var checkTrucksID = null;
var moveLogsID = null;
var checkLogsID = null;
var checkFroggerID = null;

// utility functions

// returns a random number within the given range and starting at the given offset
function getRandom(range, offset) {
  return (Math.floor((Math.random() * range) + offset));
}
