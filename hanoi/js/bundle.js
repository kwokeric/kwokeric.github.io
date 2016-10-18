/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	const HanoiView = __webpack_require__(2);
	const HanoiGame = __webpack_require__(1);

	$( () => {
	  const rootEl = $('.toh');
	  const game = new HanoiGame();
	  new HanoiView(game, rootEl);
	});


/***/ },
/* 1 */
/***/ function(module, exports) {

	class Game {
	  constructor() {
	    this.towers = [[4, 3, 2, 1], [], []];
	  }

	  isValidMove(startTowerIdx, endTowerIdx) {
	      const startTower = this.towers[startTowerIdx];
	      const endTower = this.towers[endTowerIdx];

	      if (startTower.length === 0) {
	        return false;
	      } else if (endTower.length == 0) {
	        return true;
	      } else {
	        const topStartDisc = startTower[startTower.length - 1];
	        const topEndDisc = endTower[endTower.length - 1];
	        return topStartDisc < topEndDisc;
	      }
	  }

	  isWon() {
	      // move all the discs to the last or second tower
	      return (this.towers[2].length == 4) || (this.towers[1].length == 4);
	  }

	  move(startTowerIdx, endTowerIdx) {
	      if (this.isValidMove(startTowerIdx, endTowerIdx)) {
	        this.towers[endTowerIdx].push(this.towers[startTowerIdx].pop());
	        return true;
	      } else {
	        return false;
	      }
	  }

	  print() {
	      console.log(JSON.stringify(this.towers));
	  }

	  promptMove(reader, callback) {
	      this.print();
	      reader.question("Enter a starting tower: ", start => {
	        const startTowerIdx = parseInt(start);
	        reader.question("Enter an ending tower: ", end => {
	          const endTowerIdx = parseInt(end);
	          callback(startTowerIdx, endTowerIdx)
	        });
	      });
	  }

	  run(reader, gameCompletionCallback) {
	      this.promptMove(reader, (startTowerIdx, endTowerIdx) => {
	        if (!this.move(startTowerIdx, endTowerIdx)) {
	          console.log("Invalid move!");
	        }

	        if (!this.isWon()) {
	          // Continue to play!
	          this.run(reader, gameCompletionCallback);
	        } else {
	          this.print();
	          console.log("You win!");
	          gameCompletionCallback();
	        }
	      });
	  }
	}

	module.exports = Game;


/***/ },
/* 2 */
/***/ function(module, exports) {

	class View {
	  constructor(game, $el) {
	    this.game = game;
	    this.element = $el;
	    this.towers = this.render();
	    this.firstClick = false;
	  }

	  setupTowers() {
	    let towers = [];

	    for(let i = 0; i < 3; i++){
	      towers.push($(`<ul data-tower-nr=${i}></ul>`));
	    }

	    return towers;
	  }

	  render() {
	    let viewTowers = this.setupTowers();
	    let gameTowers = this.game.towers;

	    for(let i = 0; i < gameTowers.length; i++){
	      let gameTower = gameTowers[i];
	      let viewTower = viewTowers[i];

	      for(let j = 0; j < gameTower.length; j++){
	        viewTower.append(`<li class="disc-${gameTower[j]}"></li>`);
	      }
	    }

	    this.element.empty();
	    this.element.append(viewTowers);
	    this.bindEvents();
	    return viewTowers;
	  }

	  clickCallback(currentClick) {
	    if (this.firstClick !== false) {
	      this.game.move(this.firstClick, currentClick);
	      this.firstClick = false;
	    } else {
	      this.firstClick = currentClick;
	    }
	  }

	  bindEvents() {
	    $("ul").on("click", (event) => {
	      let tower = $(event.currentTarget);
	      let towerNumber = parseInt(tower.attr("data-tower-nr"));
	      console.log(this.game.towers);

	      this.clickCallback(towerNumber);
	      this.render();

	      if (this.game.isWon()) {
	        this.element.append("<h1>YOU WON</h1>")
	      }
	    });

	    $("ul").addClass("hover");
	  }

	}













	module.exports = View;


/***/ }
/******/ ]);