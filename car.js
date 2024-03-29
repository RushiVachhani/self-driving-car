import { Controls } from "./controls.js";
import { Sensor } from "./sensor.js";

export class Car {
  constructor(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;

    this.speed = constants.CAR_INITIAL_SPEED;
    this.acceleration = constants.CAR_ACCELERATION;

    this.maxSpeed = constants.CAR_MAX_SPEED;
    this.friction = constants.CAR_FRICTION;

    this.angle = constants.CAR_INITIAL_ANGLE;

    this.sensor = new Sensor(this);
    this.controls = new Controls();
  }

  update(roadBorders) {
    this.#move();
    this.sensor.update(roadBorders);
  }

  #move() {
    if (this.controls.forward) {
      this.speed = this.speed + this.acceleration;
    }
    if (this.controls.reverse) {
      this.speed = this.speed - this.acceleration;
    }

    if (this.speed > this.maxSpeed) {
      this.speed = this.maxSpeed;
    }
    if (this.speed < (this.maxSpeed / 2) * -1) {
      this.speed = (this.maxSpeed / 2) * -1;
    }
    if (this.speed > 0) {
      this.speed = this.speed - this.friction;
    }
    if (this.speed < 0) {
      this.speed = this.speed + this.friction;
    }
    if (Math.abs(this.speed) < this.friction) {
      this.speed = 0;
    }

    if (this.speed != 0) {
      const flip = this.speed > 0 ? 1 : -1;
      if (this.controls.left) {
        this.angle = this.angle + constants.CAR_ANGLE_INCREMENT_FACTOR * flip;
      }
      if (this.controls.right) {
        this.angle = this.angle - constants.CAR_ANGLE_INCREMENT_FACTOR * flip;
      }
    }

    this.x = this.x - Math.sin(this.angle) * this.speed;
    this.y = this.y - Math.cos(this.angle) * this.speed;
  }

  draw(ctx) {
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(this.angle * -1);
    ctx.beginPath();
    ctx.rect(-this.width / 2, -this.height / 2, this.width, this.height);
    ctx.fill();
    ctx.restore();

    this.sensor.draw(ctx);
  }
}
