window.onload = () => {
	let canvas = document.getElementById('gameCanvas');
	let canvasContext = canvas.getContext('2d');
	let playerScore = 0;
	let highScore = 0;
	const framesPerSecond = 30;

	const APPLE = {
		size: 6,
		color: 'red',
		points: 1,
	};

	let applePosition = {
		// initialize apple position
		xPos: 120,
		yPos: 120,
	};

	const SNAKE = {
		size: 11,
		color: 'green',
		travelSpeed: 5,
		direction: 'up',
		tail,
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
		console.log(`Snake position -- X: ${snakePosition.xPos}, Y: ${snakePosition.yPos}`);

		canvasContext.beginPath();
		canvasContext.fillStyle = SNAKE.color;
		canvasContext.rect(snakePosition.xPos, snakePosition.yPos, SNAKE.size, SNAKE.size);
		canvasContext.fill();
		canvasContext.closePath();
	};

	const drawApple = (x, y) => {
		canvasContext.beginPath();
		canvasContext.fillStyle = APPLE.color;
		canvasContext.arc(applePosition.xPos, applePosition.yPos, APPLE.size, 0, Math.PI * 2, true);
		console.log(`Apple location: ${x} ${y}`);
		canvasContext.fill();
		canvasContext.closePath();
	};

	// game initialized and scanning the canvas for human interaction
	setInterval(() => {
		// (heartbeat)

		// move the snake
		// drawEverything();

		// check to see if snake is eating apple
		if (snakePosition.xPos === applePosition.xPos && snakePosition.yPos === applePosition.yPos) {
			console.log('apple!');
		}

		// check if snake is touching boundaries
		if (snakePosition.yPos === 0 || snakePosition.yPos === canvas.width) {
			console.log('hit!');
		} else if (snakePosition.xPos === 0 || snakePosition.xPos === canvas.width) {
			console.log('hit!');
		} else {
			// if snake isn't out of bounds, continue the game
			drawBackground();
			drawSnake();
			drawApple(120, 120);
		}
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
