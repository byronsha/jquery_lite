/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/js/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	var Board = __webpack_require__(1);
	var View = __webpack_require__(3);
	
	Jl.$l(function() {
	  var $rootElement = Jl.$l(".snake");
	  var board = new Board(25);
	  var view = new View(board, $rootElement);
	
	})


/***/ },
/* 1 */
/***/ function(module, exports) {

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


/***/ },
/* 2 */,
/* 3 */
/***/ function(module, exports) {

	var View = function(board, $el) {
	  this.board = board;
	  this.$el = $el;
	
	  this.setupBoard();
	  this.renderSnake();
	  this.bindEvents();
	
	  window.setInterval(this.step.bind(this), 2000);
	}
	
	View.prototype.setupBoard = function () {
	  for (var i = 0; i < this.board.size; i++) {
	    for (var j = 0; j < this.board.size; j++) {
	      var $newTile = Jl.$l('<div>');
	      $newTile.attr("pos", [i, j]);
	      this.$el.append($newTile);
	    }
	  }
	};
	
	View.prototype.renderApples = function () {
	  Jl.$l('div').removeClass('apple');
	  var a = document.querySelector("div[pos='" + this.board.apple + "']");
	  Jl.$l(a).addClass("apple");
	};
	
	View.prototype.renderSnake = function () {
	  Jl.$l('div').removeClass('snake');
	  this.board.snake.segments.forEach(function(segment) {
	    segment = segment.toString();
	    var a = document.querySelector("div[pos='" + segment + "']");
	    Jl.$l(a).addClass("snake");
	  })
	};
	
	View.prototype.step = function () {
	  console.log(this.board.snake.segments);
	  this.board.moveSnake();
	  this.renderSnake();
	  this.renderApples();
	  console.log(this.board.snake.segments);
	};
	
	View.prototype.bindEvents = function () {
	  var that = this;
	
	  window.addEventListener("keydown", View.checkKeyPressed.bind(this), false);
	};
	
	View.checkKeyPressed = function(event) {
	  if (event.keyCode === (37)) {
	    this.board.snake.direction = "W";
	  } else if (event.keyCode === (38)) {
	    this.board.snake.direction = "N";
	  } else if (event.keyCode === (39)) {
	    this.board.snake.direction = "E";
	  } else if (event.keyCode === (40)) {
	    this.board.snake.direction = "S";
	  }
	  console.log(event.keyCode);
	  console.log(this.board.snake.direction);
	}
	
	module.exports = View;


/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map