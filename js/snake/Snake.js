// export { moveSnake } from './snakeMovement.js';
// export { drawSnake } from './drawSnake.js';

// export const Snake = {
//   // starting snake position
// 	let startX = 140;
// 	let startY = 140;

  drawSnake: (x, y, context) => {
    context.beginPath();
    context.fillStyle = 'green';
    context.rect(x, y, 20, 20);
  
    context.fill();
    context.closePath();
  }
}

Snake = (xPos, yPos, tail) => {
  this.xPos = xPos;
  this.yPos = yPos;
  // this.tail = tail;
}

let newSnake = new Snake(140, 140)