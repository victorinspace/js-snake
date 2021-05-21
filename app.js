window.onload = () => {
  const DEBUG = false;

	let canvas = document.getElementById('gameCanvas');
	let canvasContext = canvas.getContext('2d');
	let playerScore = 0;
	let framesPerSecond = 1000 / 30;

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
		size: 14,
		color: 'green',
		travelSpeed: 5,
		direction: 'up',
    head: { xPos: 200, yPos: 200 },
    tail: [
      { xPos: 200, yPos: 221 },
      { xPos: 200, yPos: 241 },
      { xPos: 200, yPos: 251 },
    ]
	};
  

  const stopGame = () => {
    clearInterval(gameInterval);
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
		} else if (snakeDirection === 'right') {
			SNAKE.head.xPos += SNAKE.travelSpeed;
      SNAKE.tail[0].xPos += SNAKE.travelSpeed;
		} else if (snakeDirection === 'down') {
			SNAKE.head.yPos += SNAKE.travelSpeed;
      SNAKE.tail[0].yPos += SNAKE.travelSpeed;
		} else if (snakeDirection === 'left') {
			SNAKE.head.xPos -= SNAKE.travelSpeed;
      SNAKE.tail[0].xPos -= SNAKE.travelSpeed;

		}

		canvasContext.beginPath();
		canvasContext.fillStyle = SNAKE.color;
		canvasContext.rect(x, y, SNAKE.size, SNAKE.size);
		canvasContext.fill();
		canvasContext.closePath();
	};

	const drawApple = () => {
		canvasContext.beginPath();
		canvasContext.fillStyle = APPLE.color;
		canvasContext.arc(
      APPLE.coordinates.xPos, APPLE.coordinates.yPos, 
      APPLE.size, 0, 
      Math.PI * 2);
		canvasContext.fill();
		canvasContext.closePath();
	};

  const drawCurrentScore = () => {
    canvasContext.font = '10px Arial';
    canvasContext.fillStyle = 'white';
    canvasContext.fillText(`Score: ${playerScore}`, 6, 13);
  }

  const doesSnakeEatApple = () => {
    if (SNAKE.head.xPos === APPLE.coordinates.xPos &&
      SNAKE.head.yPos === APPLE.coordinates.yPos ) {
        console.log(`Apple eaten! The snake was at ${SNAKE.head.xPos}, ${SNAKE.head.yPos}`);
        playerScore++;
        APPLE.coordinates.xPos = randomEvenNumber(canvas.width);
        APPLE.coordinates.yPos = randomEvenNumber(canvas.width);
		}
  }

  // *** == Debuging Env == *** //
  if (DEBUG === true) {
    APPLE.coordinates.xPos = 200;
    APPLE.coordinates.yPos = 160;
    framesPerSecond = 500;
  }


  // *** == GAME INITIALIZED == *** //
	let gameInterval = setInterval(() => {

    doesSnakeEatApple();

		// check if snake hits a wall
		if (SNAKE.head.yPos === 0 || SNAKE.head.yPos === canvas.width) {
			console.log('Wall Hit! Game Over!');
      console.log(`snake: ${SNAKE.head.xPos}, ${SNAKE.head.yPos}`);
      
      stopGame();
			// check player high score
		} else if (SNAKE.head.xPos === 0 || SNAKE.head.xPos === canvas.width) {
			console.log('Wall Hit! Game Over!');
      console.log(`snake: ${SNAKE.head.xPos}, Y: ${SNAKE.head.yPos}`);
      stopGame();
			// check player high score
		} else {
			drawBackground();
			
      drawSnake(SNAKE.head.xPos, SNAKE.head.yPos);
      drawSnake(SNAKE.tail[0].xPos, SNAKE.tail[0].yPos);
      
      drawApple();
      console.log(`apl: ${APPLE.coordinates.xPos}, ${APPLE.coordinates.xPos}`);
      
      drawCurrentScore();
		}

	}, framesPerSecond);


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

