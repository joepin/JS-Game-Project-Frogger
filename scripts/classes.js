class Sprite {

  constructor(type) {
    this.type = type;
    this.cellsTakenUp = this.getCellElems();
    this.offBoard = false;
  }

  move() {
    var $nextCell = this.type.$nextCell;
    var $removeCell = this.type.$trailingCell;
    var $leadingCell = this.type.$leadingCell;
    if (!$nextCell && !$removeCell && !this.type.firstMove) {
      this.offBoard = true;
    }
    this.swapCells();
    this.updateObject();
    this.cellsTakenUp = this.getCellElems();
    this.type.firstMove = false;
  }

  updateObject() {
    if (this.type.direction == 'neg') {
      this.type.rightColNum--;
    }
    if (this.type.direction == 'pos') {
      this.type.rightColNum++;
    }
    this.type.leftColNum = this.type.rightColNum - this.type.spriteLength;
  }

  swapCells() {

    var $next = this.type.$nextCell;
    var $remove = this.type.$trailingCell;
    var $leading = this.type.$leadingCell;

    if (!$next && !$leading && !$remove) {
      // DNE
      this.offBoard = true;
      this.offBoard = true;
      this.type.offBoard = true;
      // console.log ('off board: ', this);
    } else if ((!$next && !$leading && $remove) || (!$next && $leading && $remove)) {
      this.offBoard = false;
      this.type.offBoard = false;
      // get rid of remove
      var nextClass = $remove.getAttribute('class');
      var newClass = nextClass.replace((' ' + this.type.typeClass), '');
      $remove.setAttribute('class', newClass);
      $remove.dataset.isallowed = this.type.canBePlacedOn;
    } else if (($next && !$leading && !$remove) || ($next && $leading && !$remove)) {
      this.offBoard = false;
      this.type.offBoard = false;
      // move leading to next
      var nextClass = $next.getAttribute('class');
      $next.setAttribute('class', (nextClass + ' ' + this.type.typeClass));
      $next.dataset.isallowed = this.type.canHoldFrogger;
    } else if ($next && $leading && $remove) {
      this.offBoard = false;
      this.type.offBoard = false;
      // do full move
      // get rid of remove
      var nextClass = $remove.getAttribute('class');
      var newClass = nextClass.replace((' ' + this.type.typeClass), '');
      $remove.setAttribute('class', newClass);
      $remove.dataset.isallowed = this.type.canBePlacedOn;
      // move leading to next
      var nextClass = $next.getAttribute('class');
      $next.setAttribute('class', (nextClass + ' ' + this.type.typeClass));
      $next.dataset.isallowed = this.type.canHoldFrogger;
    }
  }

  getCellElems() {
    var $allCells = $(('.cell-' + this.type.cellNum)).toArray();
    var toReturn = [];
    var dir = this.type.direction;
    var left = this.type.leftColNum;
    var right = this.type.rightColNum
    for (var i = (left); i < right; i++){
      toReturn.push($allCells[i]);
    }
    if (dir == 'neg') {
      this.type.$leadingCell = $allCells[left];
      this.type.$trailingCell = $allCells[right - 1];
      this.type.$nextCell = $allCells[left - 1];
    }
    if (dir == 'pos') {
      this.type.$leadingCell = $allCells[right - 1];
      this.type.$trailingCell = $allCells[left];
      this.type.$nextCell = $allCells[right];
    }
    return toReturn;
  }

  isOffBoard() {
    return this.type.offBoard;
  }

}

class Truck {
  constructor(randOrOrdered) {
    this.creationType = randOrOrdered;
    this.canBePlacedOn = 'yes';
    this.canHoldFrogger = 'no';
    this.typeClass = 'truck';
    this.firstMove = false;
    this.spriteLength = 3;
    this.cellNum = getRandom(7, 10);
    if (this.cellNum % 2 == 0) {
      this.direction = 'neg';
    } else {
      this.direction = 'pos';
    }
    if (randOrOrdered == 'rand') {
      this.rightColNum = getRandom(14, 4);
      this.offBoard = false;
    }
    if (randOrOrdered == 'ordered') {
      this.firstMove = true;
      this.offBoard = true;
      if (this.direction == 'neg'){
        this.rightColNum = gridSize + 1 + this.spriteLength;
        this.$nextCell = $('.cell-' + (gridSize)).eq(this.cellNum);
      }
      if (this.direction == 'pos') {
        this.rightColNum = 0;
        this.$nextCell = $('.cell-1').eq(this.cellNum);
      }
    }
    this.leftColNum = this.rightColNum - this.spriteLength;
  }

  getNextCell() {
    var dir = this.direction;
    if (dir == 'neg') {
      return this.$nextCell;
    }
    if (dir == 'pos') {
      return this.$nextCell;
    }
  }
}

class Log {
  constructor(randOrOrdered) {
    this.creationType = randOrOrdered;
    this.canBePlacedOn = 'no';
    this.canHoldFrogger = 'yes';
    this.typeClass = 'log';
    this.firstMove = false;
    this.spriteLength = 4;
    this.cellNum = getRandom(7, 2);
    if (this.cellNum % 2 == 0) {
      this.direction = 'neg';
    } else {
      this.direction = 'pos';
    }

    if (randOrOrdered == 'rand') {
      this.rightColNum = getRandom(14, 4);
      this.offBoard = false;
    }
    if (randOrOrdered == 'ordered') {
      this.firstMove = true;
      this.offBoard = true;
      if (this.direction == 'neg') {
        this.rightColNum = gridSize + 1 + this.spriteLength;
        this.$nextCell = $('.cell-' + (gridSize)).eq(this.cellNum);
      }
      if (this.direction == 'pos') {
        this.rightColNum = 0;
        this.$nextCell = $('.cell-1').eq(this.cellNum);
      }
    }
    this.leftColNum = this.rightColNum - this.spriteLength;
  }
}
