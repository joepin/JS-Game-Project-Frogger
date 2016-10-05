console.log('game-script.js linked!');

var gridSize = 9;
var $curPos = null;
var $mainContainer = null;
var genID = null;
var numTrucks = 0;
var allTrucks = {};

$(function() {
  console.log('jQuery works!');
  $(window).on('keydown', checkKey);
  // genID = setInterval(generateTruck, 1000);
  $mainContainer = $('.main-container').eq(0);
  generateTruck();
});

function generateTruck() {
  numTrucks++;

  if(numTrucks > 6) {
    return;
  }

  var lengthOfTruck = 3;
  var rightColNum = Math.floor((Math.random() * 6) + 4);
  var leftColNum = rightColNum - lengthOfTruck;
  console.log(leftColNum, rightColNum);
  var cellNum = Math.floor((Math.random() * 5) + 5);
  console.log(cellNum);
  var cellsForNewTruck = $(('.cell-' + cellNum + ':lt(' + (rightColNum) + '):gt(' + (leftColNum - 1) + ')'));
  // console.log(cellsForNewTruck);
  cellsForNewTruck.css('background', 'red');
  cellsForNewTruck.data('isAllowed', 'false');
  // var
  // allTrucks[]
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
    if ($nextEl.data('isAllowed') == 'false') {
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
