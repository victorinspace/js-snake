window.onload = () => {
  const DEBUG = false;

	let canvas = document.getElementById('gameCanvas');
	let canvasContext = canvas.getContext('2d');
	let playerScore = 0;
	const framesPerSecond = 30;

  const randomEvenNumber = (canvasSize) => {
		let randomNumber = Math.floor(Math.random() * canvasSize);
		if (randomNumber % 2 === 1) {
			randomNumber++;
		}
		return randomNumber;
	};

  let score = {
    total: 0
  }

	const APPLE = {
		size: 8,
		color: 'red',
		points: 1,
    coordinates: {
      xPos: randomEvenNumber(canvas.width),
      yPos: randomEvenNumber(canvas.width)
    }
	};

	const SNAKE = {
		size: 15,
		color: 'green',
		travelSpeed: 5,
		direction: 'up',
    head: { xPos: 200, yPos: 200 },
    tail: [
      { xPos: 220, yPos: 220 },
      { xPos: canvas.width / 2, yPos: canvas.width / 2 },
      { xPos: canvas.width / 2, yPos: canvas.width / 2 },
    ]
	};
  

  const stopGame = () => {
    clearInterval(gameInterval);
    console.log('game stopped');
  }

	const drawBackground = () => {

		canvasContext.beginPath();
		canvasContext.fillStyle = 'black';
		canvasContext.rect(0, 0, canvas.width, canvas.width);
		canvasContext.fill();
		canvasContext.closePath();

	};

	const drawSnake = (x, y) => {
    let snakeDirection = SNAKE.direction;

    // determine which way to draw snake
		if (snakeDirection === 'up') {
			SNAKE.head.yPos -= SNAKE.travelSpeed;
      SNAKE.tail[0].yPos -= SNAKE.travelSpeed
      // for (let i = 0; i < SNAKE.tail.length; i++) {
      //   return SNAKE.tail[i].yPos -= SNAKE.travelSpeed;
      // }
		} else if (snakeDirection === 'right') {
			SNAKE.head.xPos += SNAKE.travelSpeed;
      SNAKE.tail[0].xPos += SNAKE.travelSpeed;
      // for (let i = 0; i < SNAKE.tail.length; i++) {
      //   return SNAKE.tail[i].xPos += SNAKE.travelSpeed;
      // }
		} else if (snakeDirection === 'down') {
			SNAKE.head.yPos += SNAKE.travelSpeed;
SNAKE.tail[0].yPos += SNAKE.travelSpeed;
      // for (let i = 0; i < SNAKE.tail.length; i++) {
      //   return SNAKE.tail[i].yPos += SNAKE.travelSpeed;
      // }
		} else if (snakeDirection === 'left') {
			SNAKE.head.xPos -= SNAKE.travelSpeed;
SNAKE.tail[0].xPos -= SNAKE.travelSpeed;
      // for (let i = 0; i < SNAKE.tail.length; i++) {
      //   return SNAKE.tail[i].xPos -= SNAKE.travelSpeed;
      // }
		}

		canvasContext.beginPath();
		canvasContext.fillStyle = SNAKE.color;
		canvasContext.rect(x, y, SNAKE.size, SNAKE.size);
		canvasContext.fill();
		canvasContext.closePath();

    // console.log(SNAKE.direction);
		console.log(`Snake position -- X: ${SNAKE.head.xPos}, Y: ${SNAKE.head.yPos}`);

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

    let deltaX = SNAKE.head.xPos - APPLE.coordinates.xPos;
    let deltaY = SNAKE.head.yPos - APPLE.coordinates.yPos;
    let distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
    console.log(distance);

  }

  const drawCurrentScore = () => {
    canvasContext.font = '10px Arial';
    canvasContext.fillStyle = 'white';
    canvasContext.fillText(`Score: ${playerScore}`, 6, 13);
  }

  if (DEBUG === true) {
    APPLE.coordinates.xPos = 150,
    APPLE.coordinates.yPos = 100
  }


	// *** GAME INITIALIZED *** //
	let gameInterval = setInterval(() => {

		// check to see if snake is eating apple
		if (SNAKE.head.xPos === APPLE.coordinates.xPos && SNAKE.head.yPos === APPLE.coordinates.yPos) {
			console.log('apple!');
			playerScore++;
      APPLE.coordinates.xPos = randomEvenNumber(canvas.width);
      APPLE.coordinates.yPos = randomEvenNumber(canvas.width);
		}

		// check if snake is touching boundaries
		if (SNAKE.head.yPos === 0 || SNAKE.head.yPos === canvas.width) {
			console.log('hit!');
			// game over
      stopGame();
			// check player high score
		} else if (SNAKE.head.xPos === 0 || SNAKE.head.xPos === canvas.width) {
			console.log('hit!');
			// game over
      stopGame();
			// check player high score
		} else {
			// if snake isn't out of bounds, continue the game
			drawBackground();
			drawSnake(SNAKE.head.xPos, SNAKE.head.yPos);
      drawSnake(SNAKE.tail[0].xPos, SNAKE.tail[0].yPos)
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

