import { Car } from "./car.js";

// get the canvas and set the width and the height
const canvas = document.getElementById("mainCanvas");
canvas.height = window.innerHeight;
canvas.width = constants.CANVAS_WIDTH;

// get the canvas context
const ctx = canvas.getContext("2d");

const car = new Car(
  constants.CAR_STARTING_POS_X,
  constants.CAR_STARTING_POS_Y,
  constants.CAR_WIDTH,
  constants.CAR_HEIGHT
);
car.draw(ctx);

animate();

function animate() {
  car.update();
  canvas.height = window.innerHeight;
  car.draw(ctx);
  requestAnimationFrame(animate);
}
