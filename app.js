window.onload = () => {
	let canvas = document.getElementById('gameCanvas');
	let canvasContext = canvas.getContext('2d');
	const framesPerSecond = 30;

	const APPLE = {
		size: 5,
		color: 'red',
		points: 1,
	};

	const SNAKE = {
		size: 10,
		color: 'green',
		travelSpeed: 5,
		coordinates: {
			xPos: canvas.width / 2.1,
			yPos: canvas.width / 2.1,
		},
	};

	// let snakePosition = {
	// 	// initialize snake position
	// 	xPos: canvas.width / 2,
	// 	yPos: canvas.width / 2,
	// };

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
		SNAKE.coordinates.yPos -= 2;
		console.log(SNAKE.coordinates.yPos);

		canvasContext.beginPath();
		canvasContext.fillStyle = SNAKE.color;
		// canvasContext.rect(x, y, SNAKE.size, SNAKE.size);
		canvasContext.rect(
			SNAKE.coordinates.xPos,
			SNAKE.coordinates.yPos,
			SNAKE.size,
			SNAKE.size
		);
		canvasContext.fill();
		canvasContext.closePath();
	};

	const drawApple = (x, y) => {
		canvasContext.beginPath();
		canvasContext.fillStyle = APPLE.color;
		canvasContext.arc(
			canvas.width - 5,
			canvas.width - 5,
			APPLE.size,
			0,
			Math.PI * 2,
			true
		);
		canvasContext.fill();
		canvasContext.closePath();
	};

	const checkSnakeDirection = (e) => {
		// debugger;
		switch (e.key) {
			case 'ArrowUp':
				SNAKE.coordinates.yPos -= SNAKE.travelSpeed;
				// snakePosition.yPos -= SNAKE.travelSpeed;
				console.log(SNAKE.coordinates.yPos);

				break;
			case 'ArrowRight':
				SNAKE.coordinates.xPos += SNAKE.travelSpeed;
				break;
			case 'ArrowDown':
				SNAKE.coordinates.yPos += SNAKE.travelSpeed;
				break;
			case 'ArrowLeft':
				SNAKE.coordinates.xPos -= SNAKE.travelSpeed;
				break;
			default:
				break;
		}
	};

	const keyEventListener = (e) => {
		checkSnakeDirection(e);
	};

	// game initialized and scanning the canvas for human interaction
	setInterval(() => {
		console.log('beep ... beep ...');

		// (heartbeat)
		drawBackground();
		drawSnake();
		drawSnake();
		drawSnake();
		drawApple(canvas.width - 5, canvas.width - 5);

		// move the snake
		// check to see if snake is eating apple
		// check if snake is touching boundaries
	}, 1000 / framesPerSecond);

	window.addEventListener('keydown', keyEventListener);
};
