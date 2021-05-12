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

	move = (deltaX) => {
		this.xPos += deltaX;
	};

	moveUp = (deltaY) => {
		this.yPos -= deltaY;
	};
	moveRight = (deltaX) => {
		this.xPos += deltaX;
	};
	moveDown = (deltaY) => {
		this.yPos += deltaY;
	};
	moveLeft = (deltaX) => {
		this.xPos -= deltaX;
	};
}

const drawSnake = (x, y, context) => {
	context.beginPath();
	context.fillStyle = 'green';
	context.rect(x, y, 10, 10);
	context.fill();
	context.closePath();
};

const startGame = (context) => {
	drawSnake(150, 150, context);
};

const welcomeText = (context, status) => {
	let displayStatus = status;
	let welcomeMessage = 'press any key to begin';

	if (displayStatus === true) {
		context.font = '20px serif';
		context.fillStyle = 'white';
		context.textAlign = 'center';
		context.fillText(welcomeMessage, 150, 150);
	} else if (displayStatus === false) {
		context.fillText('', 0, 0);
	}
};

window.onload = () => {
	let gameStarted = false;
	let canvas = document.getElementById('gameCanvas');
	let context = canvas.getContext('2d');

	const framesPerSecond = 30;
	const snakeSpeed = 3;

	if (gameStarted === false) {
		welcomeText(context, true);

		window.addEventListener('keydown', (e) => {
			// debugger;
			e.preventDefault();
			welcomeText(context, false);
			startGame(context);
		});
	} else if (gameStarted) {
		return;
	}

	// setInterval(() => {
	// 	// newSnake.draw(context);
	// 	// newSnake.move(snakeSpeed);

	// 	// check snake head pos
	// 	// if (snakePos === 300) {
	// 	// 	// restart game
	// 	// }

	// 	// window.addEventListener('keydown', (e) => {
	// 	// 	e.preventDefault();
	// 	// 	switch (e.key) {
	// 	// 		case 'ArrowUp':
	// 	// 			console.log('arrow up');
	// 	// 			newSnake.draw(context);
	// 	// 			newSnake.moveUp(snakeSpeed);
	// 	// 			console.log(newSnake);
	// 	// 			break;
	// 	// 		case 'ArrowRight':
	// 	// 			debugger;
	// 	// 			console.log('arrow right');
	// 	// 			newSnake.draw(context);
	// 	// 			newSnake.moveRight(snakeSpeed);
	// 	// 			console.log(newSnake);
	// 	// 			break;
	// 	// 		case 'ArrowDown':
	// 	// 			console.log('arrow down');
	// 	// 			newSnake.draw(context);
	// 	// 			newSnake.moveDown(snakeSpeed);
	// 	// 			break;
	// 	// 		case 'ArrowLeft':
	// 	// 			console.log('arrow left');
	// 	// 			newSnake.draw(context);
	// 	// 			newSnake.moveLeft(snakeSpeed);
	// 	// 			break;
	// 	// 		default:
	// 	// 			break;
	// 	// 	}
	// 	// });
	// }, 1000 / framesPerSecond);
};
