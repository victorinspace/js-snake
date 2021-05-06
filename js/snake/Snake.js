export const drawSnakeHead = (x, y, context) => {
	// starting position
	// let snakeHeadX = 20;
	// let snakeHeadY = 140;

	context.beginPath();
	context.fillStyle = 'green';
	context.rect(x, y, 20, 20);
	context.fill();
	context.closePath();
};
