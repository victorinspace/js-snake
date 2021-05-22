window.onload = () => {
  const DEBUG = true;

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
		size: 10,
		color: 'red',
		points: 1,
    coordinates: {
      xPos: randomEvenNumber(canvas.width),
      yPos: randomEvenNumber(canvas.width)
    }
	};

	const SNAKE = {
		size: 20,
		color: 'green',
		travelSpeed: 20,
		direction: 'right',
    body: [
      { xPos: 60, yPos: 200 },
      { xPos: 40, yPos: 240 },
      { xPos: 20, yPos: 260 },
      { xPos: 0, yPos: 280 },
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

  const moveSnake = () => {
    let snakeDirection = SNAKE.direction;
    const snakeCopy = SNAKE.body.map(snakePart => Object.assign({}, snakePart))

		if (snakeDirection === 'up') {
			SNAKE.body[0].yPos -= SNAKE.travelSpeed;
		} else if (snakeDirection === 'right') {
			SNAKE.body[0].xPos += SNAKE.travelSpeed;
		} else if (snakeDirection === 'down') {
			SNAKE.body[0].yPos += SNAKE.travelSpeed;
		} else if (snakeDirection === 'left') {
			SNAKE.body[0].xPos -= SNAKE.travelSpeed;
		}

    // set position for snake body (not head)
    for (let i = 1; i < SNAKE.body.length; i++) {
      SNAKE.body[i] = snakeCopy[i - 1];
    }
  }

	const drawSnake = (x, y) => {
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
    if (SNAKE.body[0].xPos === APPLE.coordinates.xPos &&
      SNAKE.body[0].yPos === APPLE.coordinates.yPos ) {
        console.log(`Apple eaten! The snake was at ${SNAKE.body[0].xPos}, ${SNAKE.body[0].yPos}`);
        playerScore++;
        APPLE.coordinates.xPos = randomEvenNumber(canvas.width);
        APPLE.coordinates.yPos = randomEvenNumber(canvas.width);
		}
  }

// *** == Debuging Env == *** //
  if (DEBUG === true) {
    APPLE.coordinates.xPos = 60;
    APPLE.coordinates.yPos = 200;
    framesPerSecond = 500;
  }


// *** == GAME INITIALIZED == *** //
	let gameInterval = setInterval(() => {
    moveSnake();
    doesSnakeEatApple();

		// check if snake hits a wall
		if (SNAKE.body[0].yPos === 0 || SNAKE.body[0].yPos === canvas.width) {
			console.log('Wall Hit! Game Over!');
      console.log(`snake: ${SNAKE.body[0].xPos}, ${SNAKE.body[0].yPos}`);
      
      stopGame();
			// check player high score
		} else if (SNAKE.body[0].xPos === 0 || SNAKE.body[0].xPos === canvas.width) {
			console.log('Wall Hit! Game Over!');
      console.log(`snake: ${SNAKE.body[0].xPos}, Y: ${SNAKE.body[0].yPos}`);
      stopGame();
			// check player high score
		} else {
			drawBackground();
			
      drawSnake(SNAKE.body[0].xPos, SNAKE.body[0].yPos);
      drawSnake(SNAKE.body[1].xPos, SNAKE.body[1].yPos);

      
      
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

