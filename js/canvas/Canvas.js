import { drawSnakeHead } from '../snake/Snake.js';

// const snakeSpeed = 20;

window.onload = () => {
	let canvas = document.getElementById('gameCanvas');
	let canvasContext = canvas.getContext('2d');

	const framesPerSecond = 30;

	setInterval(() => {
		drawSnakeHead(20, 140, canvasContext);
	}, 1000 / framesPerSecond);

	window.addEventListener('keydown', (e) => {
		// console.log(e);

		switch (e.key) {
			case 'ArrowUp':
				console.log('arrow up');
				drawSnakeHead(20, 120, canvasContext);
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
	});
};
