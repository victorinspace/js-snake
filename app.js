window.onload = () => {
	class Snake {
		constructor(xPos, yPos) {
			this.xPos = xPos;
			this.yPos = yPos;
		}

		draw = (context) => {
			context.beginPath();
			context.fillStyle = 'black';
			context.rect(0, 0, 300, 300);
			context.fill();
			context.closePath();

			context.beginPath();
			context.fillStyle = 'green';
			context.rect(this.xPos, this.yPos, 10, 10);
			context.fill();
			context.closePath();
		};
	}

	const randomNumberGenerator = () => {
		Math.floor(Math.random() * 10);
	};

	const APPLE = {
		size: 10,
		xPos: Math.floor(),
	};

	const drawSnake = (x, y, context) => {
		context.beginPath();
		context.fillStyle = 'green';
		context.rect(x, y, 20, 20);
		context.fill();
		context.closePath();
	};

	const drawApple = (context) => {
		context.beginPath();
		context.fillStyle = 'red';
		context.arc(100, 100, 10 / 2, 0, Math.PI * 2, true);
		context.fill();
		context.closePath();
	};

	const startGame = (context) => {
		drawSnake(150, 150, context);
		drawApple(context);
	};

	let canvas = document.getElementById('gameCanvas');
	let context = canvas.getContext('2d');
	const framesPerSecond = 30;

	setInterval(() => {
		drawSnake(canvas.width / 2, canvas.height / 2, context);

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
