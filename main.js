import { Car } from "./car.js";

// get the canvas and set the width and the height
const canvas = document.getElementById("mainCanvas");
canvas.height = window.innerHeight;
canvas.width = 200;

// get the canvas context
const ctx = canvas.getContext("2d");

const car = new Car(100, 100, 30, 50);
car.draw(ctx);

animate();

function animate() {
  car.update();
  canvas.height = window.innerHeight;
  car.draw(ctx);
  requestAnimationFrame(animate);
}
