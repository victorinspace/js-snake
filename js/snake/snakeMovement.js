import { drawSnake } from './drawSnake.js';

export const moveSnake = (e) => {
	switch (e.key) {
		case 'ArrowUp':
			console.log('arrow up');
			drawSnake();
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
