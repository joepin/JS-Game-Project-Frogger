class Sprite {
  constructor(type) {
    this.elements = [];
    this.type = new type();
    this.cellsTakenUp = [];
  }
}

class Truck {
  constructor() {
    this.spriteLength = 3;
    this.rightColNum = Math.floor((Math.random() * 14) + 3);
    this.leftColNum = this.rightColNum - this.spriteLength;
    this.cellNum = Math.floor((Math.random() * 6) + 10);
  }
}
