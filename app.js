let snakeX = 150;
let snakeY = 150;

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

const drawSnake = (x, y, context) => {
	context.beginPath();
	context.fillStyle = 'green';
	context.rect(x, y, 10, 10);
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

const welcomeText = (context, status) => {
	let displayStatus = status;
	let welcomeMessage = 'press any key to begin';

	if (displayStatus === true) {
		context.font = '20px serif';
		context.fillStyle = 'white';
		context.textAlign = 'center';
		context.fillText(welcomeMessage, 260, 50);
	} else if (displayStatus === false) {
		context.beginPath();
		context.fillStyle = 'black';
		context.rect(0, 0, 300, 300);
		context.fill();
		context.closePath();
	}
};

const snakeDirection = (e, context) => {
	const snakeSpeed = 5;
	switch (e.key) {
		case 'ArrowUp':
			console.log('arrow up');
			snakeY += snakeSpeed;
			drawSnake(snakeX, snakeY, context);
			break;
		case 'ArrowRight':
			debugger;
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

window.onload = () => {
	let gameStarted = false;
	let canvas = document.getElementById('gameCanvas');
	let context = canvas.getContext('2d');

	const framesPerSecond = 30;
	const snakeSpeed = 3;

	setInterval(() => {
		if (gameStarted === false) {
			welcomeText(context, true);
		} else if (gameStarted === true) {
			welcomeText(contexst, false);
		}
	}, 1000 / framesPerSecond);

	// if (gameStarted === false) {
	// 	welcomeText(context, true);
	// } else if (gameStarted === true) {
	// 	welcomeText(contexst, false);
	// }
};

// window.addEventListener(
//   'keydown',
//   (e) => {
//     e.preventDefault();
//     welcomeText(context, false);
//   }
// )
