class Sprite {

  constructor(type) {
    this.type = type;
    this.cellsTakenUp = [];
    this.offBoard = false;
  }

  move() {
    var direction = null;
    // console.log(this);
    var numCells = this.cellsTakenUp.length;
    var $nextCell = null;
    var $removeCell = null;
    var $leadingCell = null;
    if (this.type.cellNum % 2 == 0) {
      direction = 'neg';
      $nextCell = this.type.$nextCellLeft;
      $removeCell = this.type.$lastCell;
      $leadingCell = this.type.$firstCell;
    } else {
      direction = 'pos';
      $nextCell = this.type.$nextCellRight;
      $removeCell = this.type.$firstCell
      $leadingCell = this.type.$lastCell;
    }
    if (!$nextCell && !$removeCell && !this.type.firstMove) {
      this.offBoard = true;
    }
    this.swapCells($nextCell, $removeCell, $leadingCell, this);
    this.updateObject(direction);
    this.cellsTakenUp = this.getCellElems(this.type.cellNum, this.type.leftColNum, this.type.rightColNum);
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

  getNextCell(sprite, dir) {
    if (dir == 'neg') {
      return sprite.type.$nextCellLeft;
    }
    if (dir == 'pos') {
      return sprite.type.$nextCellRight;
    }
  }

  swapCells($next, $remove, $leading, sprite) {
    // if ($next) {
    //   var nextClass = $next.getAttribute('class');
    //   if ($leading) {
    //     var leadingClass = $leading.getAttribute('class');
    //     if (leadingClass.includes(sprite.type.typeClass)){
    //       $next.setAttribute('class', (nextClass + ' ' + sprite.type.typeClass));
    //       $next.dataset.isallowed = sprite.type.canHoldFrogger;
    //     }
    //   } else {
    //     // $next.setAttribute('class', (nextClass + ' ' + sprite.type.typeClass));
    //     // $next.dataset.isallowed = sprite.type.canHoldFrogger;
    //   }
    // }
    // if ($remove) {
    //   var nextClass = $remove.getAttribute('class');
    //   var newClass = nextClass.replace((' ' + sprite.type.typeClass), '');
    //       $remove.setAttribute('class', newClass);
    //       $remove.dataset.isallowed = sprite.type.canBePlacedOn;
    //     }
    //    else {
    //     // $remove.setAttribute('class', newClass);
    //     // $remove.dataset.isallowed = sprite.type.canBePlacedOn;
    //   }
    if (!$next && !$leading && !$remove) {
      //DNE
    } else if ((!$next && !$leading && $remove) || (!$next && $leading && !$remove)) {
      // get rid of remove
      var nextClass = $remove.getAttribute('class');
      var newClass = nextClass.replace((' ' + sprite.type.typeClass), '');
      $remove.setAttribute('class', newClass);
      $remove.dataset.isallowed = sprite.type.canBePlacedOn;
    } else if (($next && !$leading && !$remove) || ($next && $leading && !$remove)) {
      // move leading to next
      var nextClass = $next.getAttribute('class');
      $next.setAttribute('class', (nextClass + ' ' + sprite.type.typeClass));
      $next.dataset.isallowed = sprite.type.canHoldFrogger;
    } else if ($next && $leading && $remove) {
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

  getCellElems(cellNum, left, right) {
    var $allCells = $(('.cell-' + cellNum)).toArray();
    var toReturn = [];
    for (var i = left; i < right; i++){
      toReturn.push($allCells[i]);
      // console.log(i);
    }
    this.type.$firstCell = $allCells[left];
    this.type.$lastCell = $allCells[right - 1];
    this.type.$nextCellLeft = $allCells[left - 1];
    this.type.$nextCellRight = $allCells[right];
    // console.log(toReturn);
    return toReturn;
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
    if (randOrOrdered == 'rand') {
      this.rightColNum = getRandom(14, 3);
    }
    if (randOrOrdered == 'ordered') {
      this.firstMove = true;
      if (this.cellNum % 2 == 0) {
        this.direction = 'neg';
        this.rightColNum = gridSize + 1 + this.spriteLength;
        this.$nextCellLeft = $('.cell-' + (gridSize)).eq(this.cellNum);
      } else {
        this.direction = 'pos';
        this.rightColNum = 0;
        this.$nextCellRight = $('.cell-1').eq(this.cellNum);
      }
    }
    this.leftColNum = this.rightColNum - this.spriteLength;
    console.log(this.cellNum, this.leftColNum, this.rightColNum);
    this.$firstCell = null;
    this.$lastCell = null;
    this.$nextCellLeft = null;
    this.$nextCellRight = null;
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
    if (randOrOrdered == 'rand') {
      this.rightColNum = getRandom(14, 3);
    }
    if (randOrOrdered == 'ordered') {
      this.firstMove = true;
      if (this.cellNum % 2 == 0) {
        this.direction = 'neg';
        this.rightColNum = gridSize + 1 + this.spriteLength;
        this.$nextCellLeft = $('.cell-' + (gridSize)).eq(this.cellNum);
      } else {
        this.direction = 'pos';
        this.rightColNum = 0;
        this.$nextCellRight = $('.cell-1').eq(this.cellNum);
      }
    }
    this.leftColNum = this.rightColNum - this.spriteLength;
    console.log(this.cellNum, this.leftColNum, this.rightColNum);
    this.$firstCell = null;
    this.$lastCell = null;
    this.$nextCellLeft = null;
    this.$nextCellRight = null;
  }
}
