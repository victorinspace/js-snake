window.onload = () => {
	let canvas = document.getElementById('gameCanvas');
	let canvasContext = canvas.getContext('2d');
	const framesPerSecond = 30;

	const randomEvenNumber = (canvasSize) => {
		let randomNumber = Math.floor(Math.random() * canvasSize);

		if (randomNumber % 2 === 1) {
			randomNumber++;
		}

		return randomNumber;
	};

	const APPLE = {
		size: 10,
		color: 'red',
		points: 1,
	};

	const SNAKE = {
		size: 20,
		color: 'green',
	};

	const drawBackground = (x, y, canvasContext) => {
		canvasContext.beginPath();
		canvasContext.fillStyle = 'black';
		canvasContext.rect(0, 0, 300, 300);
		canvasContext.fill();
		canvasContext.closePath();
	};

	const drawSnake = (x, y, canvasContext) => {
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
			randomEvenNumber(canvas.width) - 2,
			randomEvenNumber(canvas.width) - 2,
			APPLE.size,
			0,
			Math.PI * 2,
			true
		);
		canvasContext.fill();
		canvasContext.closePath();
	};
	drawApple(canvasContext);
	// Scan the canvas for human interaction
	setInterval(() => {
		drawSnake(canvas.width / 2, canvas.height / 2, canvasContext);

		window.addEventListener('keydown', handleKeyDownEvent);
	}, 1000 / framesPerSecond);

	const handleKeyDownEvent = (e) => {
		snakeDirection(e);
	};

	const snakeDirection = (e) => {
		switch (e.key) {
			case 'ArrowUp':
				console.log('arrow up');
				snake[0].y -= 5;
				break;
			case 'ArrowRight':
				console.log('arrow right');
				break;
			case 'ArrowDown':
				console.log('arrow down');
				break;
			case 'ArrowLeft':
				console.log('arrow left');
				break;
			default:
				break;
		}
	};
};
