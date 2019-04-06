export default class GameScreen {
  constructor({ height, width }) {
    this.height = height;
    this.width = width;

    this.init();
  }

  init() {
    if (!this.canvas) {
      this.canvas = document.createElement("canvas");
      this.canvas.setAttribute("class", "gameScreen");
      this.canvas.setAttribute("height", this.height);
      this.canvas.setAttribute("width", this.width);
      document.body.appendChild(this.canvas);

      this.ctx = this.canvas.getContext("2d");
    }

    const { ctx, height, width } = this;

    // clear it
    ctx.clearRect(0, 0, width, height);
  }

  update() {
    const { ctx, height, width } = this;
    // water
    ctx.fillStyle = "#2d32b8";
    ctx.fillRect(0, 0, width, height);
  }
}
