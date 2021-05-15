window.onload = () => {
	let canvas = document.getElementById('gameCanvas');
	let canvasContext = canvas.getContext('2d');
	const framesPerSecond = 30;

	const APPLE = {
		size: 9,
		color: 'red',
		points: 1,
	};

	const SNAKE = {
		size: 20,
		color: 'green',
		travelSpeed: 5,
		coordinates: {
			xPos: canvas.width / 2.1,
			yPos: canvas.width / 2.1,
		},
	};

	const randomEvenNumber = (canvasSize) => {
		let randomNumber = Math.floor(Math.random() * canvasSize);

		if (randomNumber % 2 === 1) {
			randomNumber++;
		}

		return randomNumber;
	};

	const drawBackground = () => {
		canvasContext.beginPath();
		canvasContext.fillStyle = 'black';
		canvasContext.rect(0, 0, canvas.width, canvas.width);
		canvasContext.fill();
		canvasContext.closePath();
	};

	const drawSnake = (x, y) => {
		canvasContext.beginPath();
		canvasContext.fillStyle = SNAKE.color;
		canvasContext.rect(x, y, SNAKE.size, SNAKE.size);
		canvasContext.fill();
		canvasContext.closePath();
	};

	const drawApple = (canvasContext) => {
		canvasContext.beginPath();
		canvasContext.fillStyle = APPLE.color;
		canvasContext.arc(
			randomEvenNumber(canvas.width - 5),
			randomEvenNumber(canvas.width - 5),
			APPLE.size,
			0,
			Math.PI * 2,
			true
		);
		canvasContext.fill();
		canvasContext.closePath();
	};

	drawApple(canvasContext);
	drawSnake(SNAKE.coordinates.xPos, SNAKE.coordinates.yPos);

	// game initialized and scanning the canvas for human interaction
	setInterval(() => {
		window.addEventListener('keydown', handleKeyDownEvent);
	}, 1000 / framesPerSecond);

	const handleKeyDownEvent = (e) => {
		snakeDirection(e);
	};

	const snakeDirection = (e) => {
		switch (e.key) {
			case 'ArrowUp':
				drawBackground();
				drawSnake(
					SNAKE.coordinates.xPos,
					(SNAKE.coordinates.yPos -= SNAKE.travelSpeed)
				);
				break;
			case 'ArrowRight':
				drawBackground();
				drawSnake(
					(SNAKE.coordinates.xPos += SNAKE.travelSpeed),
					SNAKE.coordinates.yPos
				);
				break;
			case 'ArrowDown':
				drawBackground();
				drawSnake(
					SNAKE.coordinates.xPos,
					(SNAKE.coordinates.yPos += SNAKE.travelSpeed)
				);
				break;
			case 'ArrowLeft':
				drawBackground();
				drawSnake(
					(SNAKE.coordinates.xPos -= SNAKE.travelSpeed),
					SNAKE.coordinates.yPos
				);
				break;
			default:
				break;
		}
	};
};
