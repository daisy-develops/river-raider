import fighter from "/assets/images/fighter.png";
import fighterLeft from "/assets/images/fighterLeft.png";
import fighterRight from "/assets/images/fighterRight.png";
import Bullet from "./Bullet";

const fighterImage = new Image();
const fighterLeftImage = new Image();
const fighterRightImage = new Image();

fighterImage.src = fighter;
fighterLeftImage.src = fighterLeft;
fighterRightImage.src = fighterRight;

export default class Fighter {
  constructor({ height, width }) {
    this.keyDownHandler = this.handleKeyDown.bind(this);
    document.addEventListener("keydown", this.keyDownHandler);

    this.keyUpHandler = this.handleKeyUp.bind(this);
    document.addEventListener("keyup", this.keyUpHandler);

    this.gameHeight = height;
    this.gameWidth = width;

    this.image = fighterImage;

    this.maxHorizontalSpeed = 7;
    this.maxVerticalSpeed = 7;
    this.speed = { x: 0, y: 0 };

    this.size = 48;

    this.position = {
      x: width / 2 - this.size / 2,
      y: height - this.size
    };
  }

  handleKeyDown(event) {
    switch (event.keyCode) {
      case 17: // ctrl
      case 32: // space
        this.fire();
        break;
      case 37:
        this.moveLeft();
        break;
      case 38:
        this.moveUp();
        break;
      case 39:
        this.moveRight();
        break;
      case 40:
        this.moveDown();
        break;
      default:
      // do nothing
      // alert("KEY CODE: " + event.keyCode);
    }
  }

  handleKeyUp(event) {
    switch (event.keyCode) {
      case 37:
      case 39:
        this.stopHorizontal();
        break;
      case 38:
      case 40:
        this.stopVertical();
        break;
      default:
      // do nothing
    }
  }

  fire() {
    console.log("PEW");
    if (!this.bullet) {
      this.bullet = new Bullet({
        height: this.gameHeight,
        origin: { x: this.position.x, y: this.position.y },
        width: this.gameWidth
      });
    }
  }

  moveDown() {
    this.speed.y = this.maxVerticalSpeed;
  }

  moveLeft() {
    this.image = fighterLeftImage;
    this.speed.x = -this.maxHorizontalSpeed;
  }

  moveRight() {
    this.image = fighterRightImage;
    this.speed.x = this.maxHorizontalSpeed;
  }

  moveUp() {
    this.speed.y = -this.maxVerticalSpeed;
  }

  stopHorizontal() {
    this.image = fighterImage;
    this.speed.x = 0;
  }

  stopVertical() {
    this.speed.y = 0;
  }

  draw(ctx) {
    const {
      image,
      position: { x, y },
      size
    } = this;
    ctx.drawImage(image, x, y, size, size);
    if (this.bullet) {
      this.bullet.draw(ctx);
    }
  }

  update(deltaTime) {
    this.position.x += this.speed.x;
    this.position.y += this.speed.y;

    if (this.position.x < 0) {
      this.position.x = 0;
    } else if (this.position.x + this.size > this.gameWidth) {
      this.position.x = this.gameWidth - this.size;
    }

    if (this.position.y < 0) {
      this.position.y = 0;
    } else if (this.position.y + this.size > this.gameHeight) {
      this.position.y = this.gameHeight - this.size;
    }

    // bullet
    if (this.bullet) {
      if (!this.bullet.destroy) {
        this.bullet.update(deltaTime);
      } else {
        delete this.bullet;
      }
    }
  }
}
