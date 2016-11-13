const View = require("./ttt-view.js");
const SuperView = require("./sttt-view.js");
const Game = require("./solution/game.js");

$( () => {
  let game = new Game();
  let view = new SuperView(game, $(".sttt"));
  let view = new View(game, $(".ttt"));
});
