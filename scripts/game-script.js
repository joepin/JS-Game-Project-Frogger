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

function generateTruck() {
  numTrucks++;
  if(numTrucks > 20) {
    return;
  }
  var lengthOfTruck = 3;
  var rightColNum = Math.floor((Math.random() * 17) + 0);
  var leftColNum = rightColNum - lengthOfTruck;
  var cellNum = Math.floor((Math.random() * 6) + 10);
  var allGood = false;
  var cellsForNewTruck;
  var broke = false;
  var count = 0;
  while (!allGood) {
    cellsForNewTruck = $(('.cell-' + cellNum + ':lt(' + (rightColNum) + '):gt(' + (leftColNum - 1) + ')'));
    for (var i = 0; i < cellsForNewTruck.length; i++) {
      if (cellsForNewTruck[i].dataset.isallowed == 'yes') {
        allGood = true;
        console.log('count: ' + count + ' true ' + i);
      } else {
        console.log('count: ' + count + ' false ' + i);
        break;
        // allGood = false;
      }
    }
    broke?console.log('still in while; broke'):broke;
    cellsForNewTruck = $(('.cell-' + cellNum + ':lt(' + (rightColNum) + '):gt(' + (leftColNum - 1) + ')'));
    rightColNum = Math.floor((Math.random() * 17) + 0);
    leftColNum = rightColNum - lengthOfTruck;
    cellNum = Math.floor((Math.random() * 6) + 10);
    count++;
    console.log(count)
  }

  for (var i = 0; i < cellsForNewTruck.length; i++) {
    cellsForNewTruck[i].dataset.isallowed = 'no';
  }
  cellsForNewTruck.css('background', 'red');
  allTrucks[('trucks' + numTrucks)] = cellsForNewTruck;
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
