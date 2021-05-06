export const drawSnakeHead = (context) => {
	let snakeHeadX = 20;
	let snakeHeadY = 140;

	context.beginPath();
	context.fillStyle = 'green';
	context.rect(snakeHeadX, snakeHeadY, 20, 20);
	context.fill();
	context.closePath();
};
