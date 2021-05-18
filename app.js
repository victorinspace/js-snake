window.onload = () => {
	let canvas = document.getElementById('gameCanvas');
	let canvasContext = canvas.getContext('2d');
	let playerScore = 0;
	let highScore = 0;
	const framesPerSecond = 30;

	const APPLE = {
		size: 8,
		color: 'red',
		points: 1,
	};

	let applePosition = {
		// initialize apple position
		xPos: 150,
		yPos: 100,
	};

	const SNAKE = {
		size: 15,
		color: 'green',
		travelSpeed: 5,
		direction: 'up',
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

		// console.log(SNAKE.direction);
		console.log(`Snake position -- X: ${snakePosition.xPos}, Y: ${snakePosition.yPos}`);

		canvasContext.beginPath();
		canvasContext.fillStyle = SNAKE.color;
		canvasContext.rect(snakePosition.xPos, snakePosition.yPos, SNAKE.size, SNAKE.size);
		canvasContext.fill();
		canvasContext.closePath();

	};

	const drawApple = () => {

		canvasContext.beginPath();
		canvasContext.fillStyle = APPLE.color;
		canvasContext.arc(applePosition.xPos, applePosition.yPos, APPLE.size, 0, Math.PI * 2, true);
		// console.log(`Apple location: ${x} ${y}`);
		canvasContext.fill();
		canvasContext.closePath();

	};

  const snakeGetsApple = () => {

    let deltaX = snakePosition.xPos - applePosition.xPos;
    let deltaY = snakePosition.yPos - applePosition.yPos;
    let distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
    console.log(distance);

  }

  const drawCurrentScore = () => {
    canvasContext.font = '10px Arial';
    canvasContext.fillStyle = 'white';
    canvasContext.fillText(`Score: ${playerScore}`, 6, 13);
  }


	// *** GAME INITIALIZED *** //
	setInterval(() => {

		// check to see if snake is eating apple
		if (snakePosition.xPos === applePosition.xPos && snakePosition.yPos === applePosition.yPos) {
			console.log('apple!');
			playerScore++;

		}

		// check if snake is touching boundaries
		if (snakePosition.yPos === 0 || snakePosition.yPos === canvas.width) {
			console.log('hit!');
			// game over
			// check player high score
		} else if (snakePosition.xPos === 0 || snakePosition.xPos === canvas.width) {
			console.log('hit!');
			// game over
			// check player high score
		} else {
			// if snake isn't out of bounds, continue the game
			drawBackground();
			drawSnake();
      drawApple()
      drawCurrentScore();
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
