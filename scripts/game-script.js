console.log('game-script.js linked!');
var timer = 0;
var timerID = null;
$(function() {
  console.log('jQuery works!');
  getAllParameters();
  timerID = setInterval(function() {
    console.log(++timer);
  }, 1000);
  $(window).on('keydown', checkKey);
  for (var i = 0; i < maxTrucks; i++) {
    var newTruck = generateTruck('rand');
    numTrucks++;
    totTrucks++;
    // console.log(newTruck);
  }
  // for (var i = 0; i < maxLogs; i++) {
  //   var newLog = generateLog('rand');
  //   numLogs++;
  //   totLogs++;
  // }
  $mainContainer = $('.main-container').eq(0);
  $body = $('body');
  moveTrucksID = setInterval(moveTrucks, 1000);
  // checkTrucksID = setInterval(checkTrucks, 1000);
  // moveLogsID = setInterval(moveLogs, 1000);
  // checkLogsID = setInterval(checkLogs, 1000);
  setInterval(function(){
    var $frogger = $('#frogger');
    if ($frogger.attr('data-isallowed') == 'no') {
      // console.log('true');
      doLoss();
    }
  }, 10);
});

function getAllParameters() {
  // get and parse the url
  var fullURL = window.location.href;
  if (!fullURL.includes('?')) {
    return;
  }
  var queryString = fullURL.split('?')[1];
  // split query string into an array of key-value pair strings
  var paramsAndVals = queryString.split('&');
  for (var i = 0; i < (paramsAndVals.length); i++) {
    var thisPair = paramsAndVals[i].split('=');
    console.log(thisPair[0] + ': ' + thisPair[1]);
  }
}

var moveNum = 0;
function moveTrucks() {
  // console.log(++moveNum);
  // console.log(allTrucks);
  for (var truck in allTrucks) {
    // console.log(allTrucks[truck]);
    allTrucks[truck].move()
  }
}

function moveLogs() {
  for (var log in allLogs) {
    allLogs[log].move();
  }
}

function checkTrucks() {

  for (var truck in allTrucks) {
    // console.log(allTrucks[truck].offBoard);
    if (allTrucks[truck].offBoard) {
      // console.log('OFFBOARD: ', allTrucks[truck]);
      delete allTrucks[truck];
      numTrucks--;
    }
  }

  if (Object.keys(allTrucks).length < (1.5 * maxTrucks)) {
    //   // console.log('true totTrucks: ' + totTrucks);
      allTrucks[('trucks' + totTrucks)] = generateTruck('ordered');
      // console.log(allTrucks[('trucks' + totTrucks)]);
      numTrucks++;
      totTrucks++;
    }
}

function checkLogs() {
      console.log('object size: ' + Object.keys(allLogs).length);

  for (var log in allLogs) {
    if (allLogs[log].offBoard) {
      // console.log('OFFBOARD: ' + allLogs[log]);
      delete allLogs[log];
      numLogs--;
    }
    if (Object.keys(allLogs).length < (1.5 * maxLogs)) {
      console.log('true totLogs: ' + totLogs);
      allLogs[('Logs' + totLogs)] = generateLog('ordered');
      numLogs++;
      totLogs++;
    }
  }
}

function generateSprite(spriteType, randOrOrdered) {
  var typeObj = new spriteType(randOrOrdered);
  var sprite = new Sprite(typeObj);
  // sprite.cellsTakenUp = sprite.getCellElems(sprite.type.cellNum, sprite.type.leftColNum, sprite.type.rightColNum, sprite.type.direction);
  // console.log(sprite);
  return sprite;
}


function isValidPosition(sprite, allSprites) {
  // var spriteCells = sprite.cellsTakenUp;
  // for(var i = 0; i < spriteCells.length; i++) {
  //   if (spriteCells[i] && spriteCells[i].dataset.isallowed != sprite.type.canBePlacedOn) {
  //     console.log('not allowed');
  //     return false;
  //   }
  // }
  // return true;
  var notAllowedRange = sprite.type.spriteLength + 1;

  for (var key in allSprites) {
    var diff = Math.abs(sprite.type.rightColNum - allSprites[key].type.rightColNum);
    if (diff < notAllowedRange  && sprite.type.cellNum == allSprites[key].type.cellNum) {
      console.log(sprite, allSprites[key], diff);
      return false;
    }
  }
  return true;
}

var gotOutCount = 0;
function generateTruck(randOrOrdered) {
  var thisTruck = generateSprite(Truck, randOrOrdered);
  var allGood = true;
  var count = 0;
  while (!isValidPosition(thisTruck, allTrucks) && allGood) {
    thisTruck = generateSprite(Truck, randOrOrdered);
    count++;
    if (count >= 5) {
      gotOutCount++;
      console.log('got out ' + gotOutCount + ' times');
      allGood = false;
    }
  }
  if (allGood) {
    // console.log(thisTruck);
    for (var i = 0; i < thisTruck.cellsTakenUp.length; i++) {
      if (thisTruck.cellsTakenUp[i]){
        thisTruck.cellsTakenUp[i].dataset.isallowed = thisTruck.type.canHoldFrogger;
        var curClass = thisTruck.cellsTakenUp[i].getAttribute('class');
        thisTruck.cellsTakenUp[i].setAttribute('class', (curClass + ' ' + thisTruck.type.typeClass));
      }
    }
    allTrucks[('trucks' + numTrucks)] = thisTruck;
    return thisTruck;
  }
}

var gotOutLogCount = 0;
function generateLog(randOrOrdered) {
  var thisLog = generateSprite(Log, randOrOrdered);
  var allGood = true;
  var count = 0;
  while (!isValidPosition(thisLog, allLogs) && allGood) {
    thisLog = generateSprite(Log, randOrOrdered);
    count++;
    if (count >= 5) {
      gotOutLogCount++;
      console.log('got out ' + gotOutLogCount + ' times');
      allGood = false;
    }
  }
  if (allGood) {
    // console.log(thisTruck);
    for (var i = 0; i < thisLog.cellsTakenUp.length; i++) {
      if (thisLog.cellsTakenUp[i]){
        thisLog.cellsTakenUp[i].dataset.isallowed = thisLog.type.canHoldFrogger;
        var curClass = thisLog.cellsTakenUp[i].getAttribute('class');
        thisLog.cellsTakenUp[i].setAttribute('class', (curClass + ' ' + thisLog.type.typeClass));
      }
    }
    allLogs[('logs' + numLogs)] = thisLog;
    return thisLog;
  }
}

  function checkKey(e) {
    $curPos = $('#frogger');
    switch(e.key) {
      case 'ArrowRight':
        moveFroggerRight();
        break;
      case 'ArrowUp':
        moveFroggerUp();
        break;
      case 'ArrowLeft':
        moveFroggerLeft();
        break;
      case 'ArrowDown':
        moveFroggerDown();
        break;
      case '1':
        clearInterval(moveTrucksID);
        clearInterval(checkTrucksID);
        clearInterval(timerID);
        break;
      case '2':
        clearInterval(moveLogsID);
        clearInterval(checkLogsID);
        clearInterval(timerID);
        break;
      default:
        // console.log(e.key);
    }
  }

  function doLoss() {
    $mainContainer.css('border-color', 'white');
    $body.css('background', 'darkred');
    $(window).off('keydown', checkKey);
    console.log('Can\'t go there! lives--');
    clearInterval(moveTrucksID);
    clearInterval(moveLogsID);
    $('#frogger').attr('id', '');
  }

  function moveFrogger(nextCol, nextCell) {
    var nextColClass = '.column-' + nextCol;
    var nextCellClass = 'cell-' + nextCell;
    var $nextEl = $(nextColClass).children().eq(nextCell-1);
    if ($nextEl.data('isallowed') == 'no') {
      doLoss();
      return;
    }
    $curPos.removeAttr('id');
    $nextEl.attr('id', 'frogger');
  }

  function getCurrentColumn() {
    return (parseInt($curPos.parent().attr('class').split('-')[1]));
  }

  function getCurrentCell() {
    return (parseInt($curPos.attr('class').split('-')[1]));
  }

  function moveFroggerRight() {
    var curCol = getCurrentColumn();;
    var curCell = getCurrentCell();
    if (curCol == gridSize) {
      return;
    }
    var nextCol = curCol + 1;
    var nextCell = curCell;
    moveFrogger(nextCol, nextCell);
  }

  function moveFroggerLeft() {
    var curCol = getCurrentColumn();;
    var curCell = getCurrentCell();
    if (curCol == 1) {
      return;
    }
    var nextCol = curCol - 1;
    var nextCell = curCell;
    moveFrogger(nextCol, nextCell);
  }

  function moveFroggerUp() {
    var curCol = getCurrentColumn();;
    var curCell = getCurrentCell();
    if (curCell == 1) {
      return;
    }
    var nextCol = curCol;
    var nextCell = curCell - 1;
    moveFrogger(nextCol, nextCell);
  }

  function moveFroggerDown() {
    var curCol = getCurrentColumn();;
    var curCell = getCurrentCell();
    if (curCell == gridSize) {
      return;
    }
    var nextCol = curCol;
    var nextCell = curCell + 1;
    moveFrogger(nextCol, nextCell);
  }

