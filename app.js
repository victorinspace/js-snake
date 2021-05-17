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
		travelSpeed: 2,
		direction: 'up',
	};

	let snakePosition = {
		// initialize snake position
		xPos: canvas.width / 2,
		yPos: canvas.width / 2,
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

	const drawSnake = () => {
		if (SNAKE.direction === 'up') {
			snakePosition.yPos -= SNAKE.travelSpeed;
		} else if (SNAKE.direction === 'right') {
			snakePosition.xPos += SNAKE.travelSpeed;
		} else if (SNAKE.direction === 'down') {
			snakePosition.yPos += SNAKE.travelSpeed;
		} else if (SNAKE.direction === 'left') {
			snakePosition.xPos -= SNAKE.travelSpeed;
		}

		console.log(SNAKE.direction);

		canvasContext.beginPath();
		canvasContext.fillStyle = SNAKE.color;
		canvasContext.rect(
			snakePosition.xPos,
			snakePosition.yPos,
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

	const drawEverything = () => {
		drawBackground();
		drawSnake();
		drawApple(canvas.width / 3, canvas.width / 3);
	};

	// game initialized and scanning the canvas for human interaction
	setInterval(() => {
		// console.log('beep ... beep ...');

		// (heartbeat)
		drawEverything();

		// move the snake
		// check to see if snake is eating apple
		// check if snake is touching boundaries
	}, 1000 / framesPerSecond);

	window.addEventListener('keydown', (e) => {
		e.preventDefault();
		switch (e.key) {
			case 'ArrowUp':
				SNAKE.direction = 'up';
				break;
			case 'ArrowRight':
				SNAKE.direction = 'right';
				break;
			case 'ArrowDown':
				SNAKE.direction = 'down';
				break;
			case 'ArrowLeft':
				SNAKE.direction = 'left';
				break;
			default:
				break;
		}
	});
};
