window.onload = () => {
	let canvas = document.getElementById('gameCanvas');
	let canvasContext = canvas.getContext('2d');
	let playerScore = 0;
	const framesPerSecond = 30;

	let APPLE = {
		size: 8,
		color: 'red',
		points: 1,
    coordinates: {
      xPos: 150,
      yPos: 100
    }
	};

	let SNAKE = {
		size: 15,
		color: 'green',
		travelSpeed: 5,
		direction: 'up',
    coordinates: {
      xPos: canvas.width / 2,
      yPos: canvas.width / 2
    }
	};

  const stopGame = () => {
    clearInterval(gameInterval);
    console.log('game stopped');
  }

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

    // determine which way to draw snake
		if (SNAKE.direction === 'up') {
			SNAKE.coordinates.yPos -= SNAKE.travelSpeed;
		} else if (SNAKE.direction === 'right') {
			SNAKE.coordinates.xPos += SNAKE.travelSpeed;
		} else if (SNAKE.direction === 'down') {
			SNAKE.coordinates.yPos += SNAKE.travelSpeed;
		} else if (SNAKE.direction === 'left') {
			SNAKE.coordinates.xPos -= SNAKE.travelSpeed;
		}

		canvasContext.beginPath();
		canvasContext.fillStyle = SNAKE.color;
		canvasContext.rect(SNAKE.coordinates.xPos, SNAKE.coordinates.yPos, SNAKE.size, SNAKE.size);
		canvasContext.fill();
		canvasContext.closePath();

    // console.log(SNAKE.direction);
		console.log(`Snake position -- X: ${SNAKE.coordinates.xPos}, Y: ${SNAKE.coordinates.yPos}`);

	};

	const drawApple = () => {

		canvasContext.beginPath();
		canvasContext.fillStyle = APPLE.color;
		canvasContext.arc(APPLE.coordinates.xPos, APPLE.coordinates.yPos, APPLE.size, 0, Math.PI * 2, true);
		console.log(`Apple location: ${APPLE.coordinates.xPos} ${APPLE.coordinates.yPos}`);
		canvasContext.fill();
		canvasContext.closePath();

	};

  const snakeGetsApple = () => {

    let deltaX = SNAKE.coordinates.xPos - APPLE.coordinates.xPos;
    let deltaY = SNAKE.coordinates.yPos - APPLE.coordinates.yPos;
    let distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
    console.log(distance);

  }

  const drawCurrentScore = () => {
    canvasContext.font = '10px Arial';
    canvasContext.fillStyle = 'white';
    canvasContext.fillText(`Score: ${playerScore}`, 6, 13);
  }


	// *** GAME INITIALIZED *** //
	let gameInterval = setInterval(() => {

		// check to see if snake is eating apple
		if (SNAKE.coordinates.xPos === APPLE.coordinates.xPos && SNAKE.coordinates.yPos === APPLE.coordinates.yPos) {
			console.log('apple!');
			playerScore++;
      APPLE.coordinates.xPos = randomEvenNumber(canvas.width);
      APPLE.coordinates.yPos = randomEvenNumber(canvas.width);
		}

		// check if snake is touching boundaries
		if (SNAKE.coordinates.yPos === 0 || SNAKE.coordinates.yPos === canvas.width) {
			console.log('hit!');
			// game over
      stopGame();
			// check player high score
		} else if (SNAKE.coordinates.xPos === 0 || SNAKE.coordinates.xPos === canvas.width) {
			console.log('hit!');
			// game over
      stopGame();
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

