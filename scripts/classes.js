class Sprite {

  constructor(type) {
    this.type = new type();
    this.cellsTakenUp = [];
  }

  move() {
    var direction = null;
    var numCells = this.cellsTakenUp.length;
    var $nextCell = null;
    var $removeCell = null;
    if (this.type.cellNum % 2 == 0) {
      direction = 'neg';
      $nextCell = this.getNextCell(this, direction);
      $removeCell = this.type.$lastCell;
    } else {
      direction = 'pos';
      $nextCell = this.getNextCell(this, direction);
      $removeCell = this.type.$firstCell
    }
    this.swapCells($nextCell, $removeCell);
    this.updateObject(direction);
    this.cellsTakenUp = this.getCellElems(this.type.cellNum, this.type.leftColNum, this.type.rightColNum);
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

  swapCells($next, $remove) {
    // if (!isFroggerAllowed($next)) {
    //   doLoss();
    // }
    if ($next) {
      $next.style.backgroundColor = 'red';
      $next.dataset.isallowed = 'no';
    }
    if ($remove) {
      $remove.style.backgroundColor = '';
      $remove.dataset.isallowed = 'yes';
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
    return toReturn;
  }

}



class Truck {
  constructor() {
    this.spriteLength = 3;
    this.rightColNum = Math.floor((Math.random() * 14) + 3);
    this.leftColNum = this.rightColNum - this.spriteLength;
    this.cellNum = Math.floor((Math.random() * 6) + 10);
    this.$firstCell = null;
    this.$lastCell = null;
    this.$nextCellLeft = null;
    this.$nextCellRight = null;
  }
}
