class View {
  constructor(game, $el) {
    this.board = this.setupBoard();
    this.game = game;
    this.element = $el;
    $el.append(this.board);
    this.bindEvents();
  }

  bindEvents() {
    $("li").on("click", (event) => {
      let cell = $(event.currentTarget);
      this.makeMove(cell);
    });
    $("li").addClass("hover");
  }

  detachEvents() {
    $("li").off("click");
    $("li").removeClass("hover");
  }

  makeMove($square) {
    let pos = $square.attr("pos").split(',');
    pos = [parseInt(pos[0]), parseInt(pos[1])];

    try {
      let mark = this.game.currentPlayer;
      this.game.playMove(pos);
      if (mark === "o") {
        $square.addClass("oh");
      } else {
        $square.addClass("ex");
      }
    } catch(err) {
      alert("And that's when he knew... He fucked up!");
    }

    if (this.game.winner()) {
      this.element.append(`<br><label>${this.game.winner().toUpperCase()} IS THE WINNER</label>`)
      this.detachEvents();
    }
  }

  setupBoard() {
    let board = "";

    for (var i = 0; i < 3; i++) {
      board += "<ul>\n";

      for (var j = 0; j < 3; j++) {
        board += `<li pos="${i},${j}"></li>\n`;
      }

      board += "</ul>\n";
    }

    return $(board);
  }
}

module.exports = View;
