console.log('game-script.js linked!');

var gridSize = 17;
var $curPos = null;
var $mainContainer = null;
var $body = null;
var genID = null;
var moveTrucksID = null;
var numTrucks = 0;
var gotOutCount = 0;
var allTrucks = {};

$(function() {
  console.log('jQuery works!');
  getAllParameters();
  $(window).on('keydown', checkKey);
  genID = setInterval(generateTruck, 0);
  $mainContainer = $('.main-container').eq(0);
  $body = $('body');
  // generateTruck();
  moveTrucksID = setInterval(moveTrucks, 1000);
  setInterval(function(){
    var $frogger = $('#frogger');
    if ($frogger.attr('data-isallowed') == 'no') {
      console.log('true');
      doLoss();
    }
  }, 10);
});

function getAllParameters() {
  // get and parse the url
  var fullURL = window.location.href;
  var queryString = fullURL.split('?')[1];
  // split query string into an array of key-value pair strings
  var paramsAndVals = queryString.split('&');
  for (var i = 0; i < (paramsAndVals.length); i++) {
    var thisPair = paramsAndVals[i].split('=');
    console.log(thisPair[0] + ': ' + thisPair[1]);
  }
}

function moveTrucks() {
  for (var truck in allTrucks) {
    allTrucks[truck].move();
  }
}

function generateSprite(spriteType) {
  var sprite = new Sprite(spriteType);
  sprite.cellsTakenUp = sprite.getCellElems(sprite.type.cellNum, sprite.type.leftColNum, sprite.type.rightColNum);
  return sprite;
}


function isValidPosition(sprite) {
  var spriteCells = sprite.cellsTakenUp;
  for(var i = 0; i < spriteCells.length; i++) {
    if (spriteCells[i].dataset.isallowed == 'no') {
      console.log('not allowed');
      return false;
    }
  }
  return true;
}

function generateTruck() {
  numTrucks++;
  if(numTrucks > 10) {
    clearInterval(genID);
    return;
  }
  var thisTruck = generateSprite(Truck);
  var allGood = true;
  var count = 0;
  while (!isValidPosition(thisTruck) && allGood) {
    thisTruck = generateSprite(Truck);
    count++;
    if (count >= 5) {
      gotOutCount++;
      console.log('got out ' + gotOutCount + ' times');
      allGood = false;
    }
  }
  if (allGood) {
    for (var i = 0; i < thisTruck.cellsTakenUp.length; i++) {
      thisTruck.cellsTakenUp[i].dataset.isallowed = 'no';
      thisTruck.cellsTakenUp[i].style.backgroundColor = 'red';
    }
    allTrucks[('trucks' + numTrucks)] = thisTruck;
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

