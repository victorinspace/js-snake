export const drawSnake = (x, y, context) => {
	context.beginPath();
	context.fillStyle = 'green';
	context.rect(x, y, 20, 20);

	context.fill();
	context.closePath();
};
