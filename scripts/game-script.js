console.log('game-script.js linked!');

var gridSize = 17;
var $curPos = null;
var $mainContainer = null;
var genID = null;
var numTrucks = 0;
var allTrucks = {};

$(function() {
  console.log('jQuery works!');
  $(window).on('keydown', checkKey);
  genID = setInterval(generateTruck, 500);
  $mainContainer = $('.main-container').eq(0);
  // generateTruck();
});

function generateSprite(spriteType, spriteLength) {
  var sprite = new Sprite(spriteType);
  sprite.spriteLength = spriteLength;
  sprite.rightColNum = Math.floor((Math.random() * 17) + 0);
  sprite.leftColNum = sprite.rightColNum - sprite.spriteLength;
  sprite.cellNum = Math.floor((Math.random() * 6) + 10);
  getCellElems(sprite);
  return sprite;
}

function getCellElems(sprite) {
  console.log(sprite.leftColNum, sprite.rightColNum, sprite.cellNum);
  var $allCells = $(('.cell-' + sprite.cellNum)).toArray();
  console.log($allCells);
  // var $goodCells = [];
  for (var i = 0; i < (sprite.rightColNum - sprite.leftColNum); i++){
    sprite.cellsTakenUp.push($allCells[i]);
    console.log(('allCells ' + i + ': '), $allCells[i]);
  }
  // console.log(sprite.cellsTakenUp);
  // return ($(('.cell-' + this.cellNum + ':lt(' + (this.rightColNum) + '):gt(' + (this.leftColNum - 1) + ')'))).get();
}

function isValidPosition(sprite) {
  var spriteCells = sprite.cellsTakenUp;
  console.log(spriteCells, spriteCells.length);
  for(var i = 0; i < spriteCells.length; i++) {
    console.log(i + ': ' + spriteCells[i]);
    console.log(spriteCells[i].dataset.isallowed);
    if (spriteCells[i].dataset.isallowed == 'no') {
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
  var lengthOfTruck = 3;
  var thisTruck = generateSprite('truck', lengthOfTruck);
  var getOut = false;
  var count = 0;
  while (!isValidPosition(thisTruck) && !getOut) {
    thisTruck = generateSprite('truck', lengthOfTruck);
    count++;
    if (count >= 5) {
      console.log('got out');
      getOut = true;
    }
  }

  for (var i = 0; i < thisTruck.cellsTakenUp.length; i++) {
    thisTruck.cellsTakenUp[i].dataset.isallowed = 'no';
    thisTruck.cellsTakenUp[i].style.backgroundColor = 'red';
    // console.log(thisTruck.cellsTakenUp[i].style.backgroundColor('red'));
    // thisTruck.cellsTakenUp[i].style('background-color', 'red');
  }
  // thisTruck.cellsTakenUp.css('background', 'red');
  allTrucks[('trucks' + numTrucks)] = thisTruck.cellsTakenUp;
  // for (truck in allTrucks) {
  //   console.log(allTrucks[truck]);
  // }
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

  function moveFrogger(nextCol, nextCell) {
    var nextColClass = '.column-' + nextCol;
    var nextCellClass = 'cell-' + nextCell;
    var $nextEl = $(nextColClass).children().eq(nextCell-1);
    if ($nextEl.data('isallowed') == 'no') {
      $mainContainer.css('border-color', 'red');
      $(window).off('keydown', checkKey);
      console.log('Can\'t go there! lives--');
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
