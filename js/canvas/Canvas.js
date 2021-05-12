// import { drawSnake, moveSnake } from '../snake/Snake.js';

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

window.onload = () => {
	let canvas = document.getElementById('gameCanvas');
	let context = canvas.getContext('2d');
	let newSnake = new Snake(20, 140);
	let isKeyUp = true;

	const framesPerSecond = 30;
	const snakeSpeed = 5;

	setInterval(() => {
		newSnake.draw(context);
		// newSnake.move(snakeSpeed);

		window.addEventListener('keydown', (e) => {
			e.preventDefault();
			switch (e.key) {
				case 'ArrowUp':
					console.log('arrow up');
					newSnake.draw(context);
					newSnake.moveUp(snakeSpeed);
					console.log(newSnake);
					break;
				case 'ArrowRight':
					debugger;
					console.log('arrow right');
					newSnake.draw(context);
					newSnake.moveRight(snakeSpeed);
					console.log(newSnake);
					break;
				case 'ArrowDown':
					console.log('arrow down');
					newSnake.draw(context);
					newSnake.moveDown(snakeSpeed);
					break;
				case 'ArrowLeft':
					console.log('arrow left');
					newSnake.draw(context);
					newSnake.moveLeft(snakeSpeed);
					break;
				default:
					break;
			}
		});
	}, 1000 / framesPerSecond);
};
