import { Car } from "./car.js";
import { Road } from "./road.js";

// get the canvas and set the width and the height
const canvas = document.getElementById("mainCanvas");
canvas.width = constants.CANVAS_WIDTH;

// get the canvas context
const ctx = canvas.getContext("2d");

const road = new Road(canvas.width / 2, canvas.width * constants.ROAD_MARGINS);

const car = new Car(
  constants.CAR_STARTING_POS_X,
  constants.CAR_STARTING_POS_Y,
  constants.CAR_WIDTH,
  constants.CAR_HEIGHT
);

animate();

function animate() {
  car.update();

  canvas.height = window.innerHeight;
  road.draw(ctx);
  car.draw(ctx);
  requestAnimationFrame(animate);
}
