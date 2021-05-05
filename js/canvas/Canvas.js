import { drawRect } from '../elements/Elements.js';

export let canvas = null;
export let canvasContext = null;

window.onload = () => {
	canvas = document.getElementById('gameCanvas');
	canvasContext = canvas.getContext('2d');

	drawRect(canvasContext, 300, 400, 20, 20, 'green');

	console.log(canvasContext);
};
