import { drawSnakeHead } from '../snake/Snake.js';

const snakeSpeed = 20;

window.onload = () => {
	let canvas = document.getElementById('gameCanvas');
	let canvasContext = canvas.getContext('2d');
	const framesPerSecond = 30;

	setInterval(() => {
		drawSnakeHead(canvasContext);
	}, 1000 / framesPerSecond);

	canvas.onkeydown = (e) => {
		if (e.key == 'Right' || e.key == 'ArrowRight') {
			RIGHT = true;
		} else if (e.key == 'Left' || e.key == 'ArrowLeft') {
			LEFT = true;
		}
	};

	canvas.onkeyup('keyup', keyUpHandler, false);
};

let UP = false;
let RIGHT = false;
let DOWN = false;
let LEFT = false;

const keyDownHandler = (e) => {
	if (e.key == 'Right' || e.key == 'ArrowRight') {
		RIGHT = true;
	} else if (e.key == 'Left' || e.key == 'ArrowLeft') {
		LEFT = true;
	}
};

const keyUpHandler = (e) => {
	if (e.key == 'Right' || e.key == 'ArrowRight') {
		RIGHT = false;
	} else if (e.key == 'Left' || e.key == 'ArrowLeft') {
		LEFT = false;
	}
};
