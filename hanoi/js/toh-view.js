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
