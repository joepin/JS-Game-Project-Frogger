class Sprite {

  constructor(type) {
    this.type = type;
    this.cellsTakenUp = this.getCellElems();
    this.offBoard = false;
  }

  move() {
    var direction = this.type.direction;
    var numCells = this.cellsTakenUp.length;
    var $nextCell = null;
    var $removeCell = this.type.$lastCell;
    var $leadingCell = this.type.$firstCell;
    if (direction == 'neg') {
      $nextCell = this.type.$nextCellLeft;
    }
    if (direction == 'pos') {
      $nextCell = this.type.$nextCellRight;
    }
    if (!$nextCell && !$removeCell && !this.type.firstMove) {
      this.offBoard = true;
    }
    this.swapCells($nextCell, $removeCell, $leadingCell, this);
    this.updateObject(direction);
    this.cellsTakenUp = this.getCellElems();
    this.type.firstMove = false;
  }

  updateObject(dir) {
    if (dir == 'neg') {
      this.type.rightColNum--;
    }
    if (dir == 'pos') {
      this.type.rightColNum++;
    }
    this.type.leftColNum = this.type.rightColNum - this.type.spriteLength;
  }

  swapCells($next, $remove, $leading, sprite) {
    if (!$next && !$leading && !$remove) {
      // DNE
      this.offBoard = true;
      sprite.offBoard = true;
      sprite.type.offBoard = true;
      // console.log ('off board: ', this);
    } else if ((!$next && !$leading && $remove) || (!$next && $leading && $remove)) {
      sprite.offBoard = false;
      sprite.type.offBoard = false;
      // get rid of remove
      var nextClass = $remove.getAttribute('class');
      var newClass = nextClass.replace((' ' + sprite.type.typeClass), '');
      $remove.setAttribute('class', newClass);
      $remove.dataset.isallowed = sprite.type.canBePlacedOn;
    } else if (($next && !$leading && !$remove) || ($next && $leading && !$remove)) {
      sprite.offBoard = false;
      sprite.type.offBoard = false;
      // move leading to next
      var nextClass = $next.getAttribute('class');
      $next.setAttribute('class', (nextClass + ' ' + sprite.type.typeClass));
      $next.dataset.isallowed = sprite.type.canHoldFrogger;
    } else if ($next && $leading && $remove) {
      sprite.offBoard = false;
      sprite.type.offBoard = false;
      // do full move
      // get rid of remove
      var nextClass = $remove.getAttribute('class');
      var newClass = nextClass.replace((' ' + sprite.type.typeClass), '');
      $remove.setAttribute('class', newClass);
      $remove.dataset.isallowed = sprite.type.canBePlacedOn;
      // move leading to next
      var nextClass = $next.getAttribute('class');
      $next.setAttribute('class', (nextClass + ' ' + sprite.type.typeClass));
      $next.dataset.isallowed = sprite.type.canHoldFrogger;
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
      this.type.$firstCell = $allCells[left];
      this.type.$lastCell = $allCells[right - 1];
      this.type.$nextCellLeft = $allCells[left - 1];
      this.type.$nextCellRight = $allCells[right];
    }
    if (dir == 'pos') {
      this.type.$firstCell = $allCells[right - 1];
      this.type.$lastCell = $allCells[left];
      this.type.$nextCellLeft = $allCells[left - 1];
      this.type.$nextCellRight = $allCells[right];
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
        this.$nextCellLeft = $('.cell-' + (gridSize)).eq(this.cellNum);
      }
      if (this.direction == 'pos') {
        this.rightColNum = 0;
        this.$nextCellRight = $('.cell-1').eq(this.cellNum);
      }
    }
    this.leftColNum = this.rightColNum - this.spriteLength;
  }

  getNextCell() {
    var dir = this.direction;
    if (dir == 'neg') {
      return this.$nextCellLeft;
    }
    if (dir == 'pos') {
      return this.$nextCellRight;
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
        this.$nextCellLeft = $('.cell-' + (gridSize)).eq(this.cellNum);
      }
      if (this.direction == 'pos') {
        this.rightColNum = 0;
        this.$nextCellRight = $('.cell-1').eq(this.cellNum);
      }
    }
    this.leftColNum = this.rightColNum - this.spriteLength;
  }
}
