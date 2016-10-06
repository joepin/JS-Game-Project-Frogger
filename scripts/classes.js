class Sprite {
  constructor(type) {
    this.elements = [];
    this.type = new type();
    this.cellsTakenUp = [];
  }

  move() {
    var direction = null;
    var numCells = this.cellsTakenUp.length;
    var $nextCell = null;
    var $removeCell = null;
    console.log(this);
    if (this.type.cellNum % 2 == 0) {
      direction = 'neg';
      $nextCell = this.getNextCell(this, direction);
      $removeCell = this.type.$lastCell;
    } else {
      direction = 'pos';
      $nextCell = this.getNextCell(this, direction);
      $removeCell = this.type.$firstCell
    }
    console.log('next cell: ' + $nextCell + ' remove cell: ' + $removeCell);
    this.swapCells($nextCell, $removeCell);
  }

  getNextCell(sprite, dir) {
    console.log(sprite);
    if (dir == 'neg') {
      return sprite.type.$nextCellLeft;
    }
    if (dir == 'pos') {
      return sprite.type.$nextCellRight;
    }
  }

  swapCells($next, $remove) {
    $next.style.backgroundColor = 'red';
    $next.dataset.isallowed = 'no';
    $remove.style.backgroundColor = '';
    $remove.dataset.isallowed = 'yes';
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
