import { Car } from "./car.js";
import { Road } from "./road.js";

// get the canvas and set the width and the height
const canvas = document.getElementById("mainCanvas");
canvas.width = constants.CANVAS_WIDTH;

// get the canvas context
const ctx = canvas.getContext("2d");

const road = new Road(canvas.width / 2, canvas.width * constants.ROAD_MARGINS);

const car = new Car(
  road.getLaneCenter(1),
  constants.CAR_STARTING_POS_Y,
  constants.CAR_WIDTH,
  constants.CAR_HEIGHT
);

animate();

function animate() {
  car.update();

  canvas.height = window.innerHeight;

  ctx.save();
  ctx.translate(0, -car.y + canvas.height * constants.CANVAS_CAMERA_POS_FACTOR);

  road.draw(ctx);
  car.draw(ctx);

  ctx.restore();

  requestAnimationFrame(animate);
}
