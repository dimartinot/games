/**
* Constructor of a Point : a point is described by two coordinates and a boolean
* @class Point
* @param {x} some int between 0 and 9
* @param {y} some int between 0 and 9
* @param {occupied} some boolean that describes the presence or the absence of a ship on this point
* @param {hit} some boolean that describes if the given point as been hit
*/
class Point {
  constructor(x,y,occupied,hit) {
    this.x = x;
    this.y = y;
    this.occupied = occupied;
    this.hit = hit;
  }

  get x() {
    return this._x;
  }

  get y() {
    return this._y;
  }

  set x(x) {
    if (x <= 9 && x >= 0) {
      this._x = x;
    } else {
      throw "X initialization Error : Out of boundaries";
      exit(-1);
    }
  }

  set y(y) {
    if (y <= 9 && y >= 0) {
      this._y = y;
    } else {
      throw "Y initialization Error : Out of boundaries";
      exit(-1);
    }
  }

  set occupied(bool) {
    if (this._occupied == undefined || this._occupied == false) {
      this._occupied = bool;
    } else {
      throw "Occupied initialization Error : already initialized as true";
      exit(-1);
    }
  }

  set hit(bool) {
    if (this._hit == undefined || this._hit == true) {
      this._hit = bool;
    } else {
      throw "Hit initialization Error : already initialized as true";
      exit(-1);
    }
  }
}

/**
* Constructor of a Grid : The grid is a list of points
* @class Grid
* @param {array} some array of Points
*/
class Grid {
  constructor(array) {
    this.array=array;
  }

  get array() {
    return this._array;
  }

  set array(tab) {
    this._array = tab;
  }

  init() {
    this._array = [];
    for (var i=0;i<100;i++) {
      let cell = new Point(i % 10,Math.floor(i / 10),false,false);
      this._array.push(cell);
    }
  }

  addShip(ship) {
    if (ship.start.x == ship.end.x) {
      if (ship.start.y>ship.end.y) {
        var tmp = ship.start.y;
        ship.start.y = ship.end.y;
        ship.end.y = tmp;
      }

      for (var i=0;i<ship.size;i++) {
        this._array[ship.start.x+(ship.start.y+i)*10].occupied = true;
      }
    } else if (ship.start.y == ship.end.y) {
      if (ship.start.x>ship.end.x) {
        var tmp = ship.start.x;
        ship.start.x = ship.end.x;
        ship.end.x = tmp;
      }
      for (var i=0;i<ship.size;i++) {
        this._array[ship.start.x+i+(ship.start.y)*10].occupied = true;
      }
    } else {
        throw "Ship Positioning Error : there is already a ship";
        exit(-1);
    }
  }
}

/**
* Constructor of a Ship : has a starting Point, an end Point and a size
* @class Graph
* @param {size} some int
* @param {} any type of variable
*/
class Ship {
  constructor(size,start,end) {
    this.start = start;
    this.end = end;
    this.size = size;
  }

  get start() {
    return this._start;
  }

  get end() {
    return this._end;
  }

  get size() {
    return this._size;
  }

  set start(start) {
    this._start = start;
  }

  set end(end) {
    this._end = end;
  }

  set size(size) {
    if (size<=5 || size>=2) {
      this._size = size;
    } else {
        throw "Size initialization Error : incorrect size";
        exit(-1);
    }
  }
}
