var Snake = function() {
  this.direction = "N";
  this.segments = [[10, 10]];
}

Snake.directionsHash = {
  "N": [-1, 0],
  "S": [1, 0],
  "E": [0, 1],
  "W": [0, -1]
}

Snake.addCoordinates = function(coord, adder) {
  return [coord[0] + adder[0], coord[1] + adder[1]];
}


Snake.prototype.move = function () {
  // var that = this;
  // this.segments.forEach(function(segment) {
  //   segment = Snake.addCoordinates(segment, Snake.directionsHash[that.direction]);
  // })

  for (var i = 0; i < this.segments.length; i++) {
    this.segments[i] = Snake.addCoordinates(this.segments[i], Snake.directionsHash[this.direction]);
  }
};

Snake.prototype.turn = function (direction) {
  this.direction = direction;
};


var Board = function(size) {
  this.snake = new Snake();
  this.grid = [];
  this.size = size;
  this.apple = [];
  this.makeApple();
}

Board.prototype.populateGrid = function () {
  for (var i = 0; i < this.size; i++) {
    for (var j = 0; j < this.size; j++) {
      this.grid.push([i, j]);
    }
  }
};

Board.prototype.makeApple = function () {
  var pos = [Math.floor(Math.random()*this.size), Math.floor(Math.random()*this.size)];
  while (this.snake.segments.indexOf(pos) !== -1) {
    pos = [Math.floor(Math.random()*this.size), Math.floor(Math.random()*this.size)];
  }
  this.apple = pos;

};

Board.prototype.moveSnake = function () {
  this.snake.move();
  console.log(this.snake.segments)
  if (this.snake.segments.indexOf(this.apple) !== -1) {
    this.makeApple();
  }
};

module.exports = Board;


// var a = document.querySelector('a[data-a=1]')
