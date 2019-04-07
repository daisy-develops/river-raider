import bullet from "/assets/images/bullet.png";

const bulletImage = new Image();
bulletImage.src = bullet;

export default class Bullet {
  constructor({ height, origin: { x, y }, width }) {
    this.gameHeight = height;
    this.gameWidth = width;

    this.height = 16;
    this.width = 2;

    this.position = {
      x: x - this.width * 4, // guessing, my image-creation-fu is crap
      y
    };

    this.speed = 20;

    this.image = bulletImage;

    this.destroy = false;
  }

  draw(ctx) {
    const {
      image,
      position: { x, y }
    } = this;
    ctx.drawImage(image, x, y);
  }

  update(deltaTime) {
    this.position.y -= this.speed;

    if (this.position.y + this.height * 2 < 0) {
      this.position.y = this.position.y + this.height;
      this.destroy = true;
    } else if (this.position.y + this.size > this.gameHeight) {
      this.position.y = this.gameHeight - this.size;
    }
  }
}
