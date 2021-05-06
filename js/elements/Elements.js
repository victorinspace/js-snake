export const drawRect = (context, leftX, topY, width, height, drawColor) => {
	context.beginPath();
	context.fillStyle = drawColor;
	context.rect(leftX, topY, width, height);
	context.fill();
	context.closePath();
};

export const drawApple = (context) => {
	context.beginPath();
	context.arc(x, y, 10, 0, Math.PI * 2);
	context.fillStyle = '#0095DD';
	context.fill();
	context.closePath();
};
