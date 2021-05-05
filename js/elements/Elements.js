export const drawRect = (context, leftX, topY, width, height, drawColor) => {
	context.beginPath();
	context.fillStyle = drawColor;
	context.rect(leftX, topY, width, height);
	context.fill();
	context.closePath();
};
