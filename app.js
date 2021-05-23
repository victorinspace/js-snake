window.onload = () => {
  const DEBUG = false;

  let canvas = document.getElementById( 'gameCanvas' );
  let canvasContext = canvas.getContext( '2d' );
  let playerScore = 0;
  let framesPerSecond = 1000 / 30;

  const randomGridPosition = () => Math.floor( Math.random() * canvas.width / 20 ) * 20 + 20;

  const APPLE = {
    size: 10,
    color: 'red',
    points: 1,
    coordinates: {
      xPos: randomGridPosition(),
      yPos: randomGridPosition()
    }
  };

  const SNAKE = {
    size: 20,
    color: 'green',
    travelSpeed: 5,
    direction: 'right',
    body: [
      { xPos: 80, yPos: 200 },
      { xPos: 60, yPos: 200 },
      { xPos: 40, yPos: 200 },
      { xPos: 20, yPos: 200 },
    ]
  };

  const stopGame = () => {
    clearInterval( gameInterval );
  }

  const drawBackground = () => {
    canvasContext.beginPath();
    canvasContext.fillStyle = 'black';
    canvasContext.rect( 0, 0, canvas.width, canvas.width );
    canvasContext.fill();
    canvasContext.closePath();
  };

  const moveSnake = () => {
    let snakeDirection = SNAKE.direction;
    const snakeCopy = SNAKE.body.map( snakePart => Object.assign( {}, snakePart ) )

    if ( snakeDirection === 'up' ) {
      SNAKE.body[0].yPos -= SNAKE.travelSpeed;
    } else if ( snakeDirection === 'right' ) {
      SNAKE.body[0].xPos += SNAKE.travelSpeed;
    } else if ( snakeDirection === 'down' ) {
      SNAKE.body[0].yPos += SNAKE.travelSpeed;
    } else if ( snakeDirection === 'left' ) {
      SNAKE.body[0].xPos -= SNAKE.travelSpeed;
    }

    // set position for snake body (not head)
    for ( let i = 1; i < SNAKE.body.length; i++ ) {
      SNAKE.body[i] = snakeCopy[i - 1];
    }
  }

  const drawSnake = ( x, y ) => {
    canvasContext.beginPath();
    canvasContext.fillStyle = SNAKE.color;
    canvasContext.rect( x, y, SNAKE.size, SNAKE.size );
    canvasContext.fill();
    canvasContext.closePath();
  };

  const drawApple = () => {
    canvasContext.beginPath();
    canvasContext.fillStyle = APPLE.color;
    canvasContext.arc(
      APPLE.coordinates.xPos, APPLE.coordinates.yPos,
      APPLE.size, 0,
      Math.PI * 2 );
    canvasContext.fill();
    canvasContext.closePath();
  };

  const updatePlayerScore = () => document.getElementById( 'player-score' ).append( playerScore );

  const doesSnakeEatApple = () => {
    if ( SNAKE.body[0].xPos === APPLE.coordinates.xPos && SNAKE.body[0].yPos === APPLE.coordinates.yPos ) {
      playerScore++;
      updatePlayerScore();

      APPLE.coordinates.xPos = randomGridPosition();
      APPLE.coordinates.yPos = randomGridPosition();
    }
  }

  // *** == Debuging Env == *** //
  if ( DEBUG === true ) {
    APPLE.coordinates.xPos = 140;
    APPLE.coordinates.yPos = 200;
    framesPerSecond = 500;
  }


  // *** == GAME INITIALIZED == *** //
  let gameInterval = setInterval( () => {
    moveSnake();
    doesSnakeEatApple();

    // == check if snake hits a wall== //
    if ( SNAKE.body[0].yPos === 0 || SNAKE.body[0].yPos === canvas.width ) {

      console.log( 'Wall Hit! Game Over!' );
      console.log( `snake head: ${SNAKE.body[0].xPos}, ${SNAKE.body[0].yPos}` );

      stopGame();
      // check player high score

    } else if ( SNAKE.body[0].xPos === 0 || SNAKE.body[0].xPos === canvas.width ) {

      console.log( 'Wall Hit! Game Over!' );
      console.log( `snake head: ${SNAKE.body[0].xPos}, Y: ${SNAKE.body[0].yPos}` );

      stopGame();
      // check player high score

    } else {

      drawBackground();

      for ( let i = 0; i < SNAKE.body.length; i++ ) {
        drawSnake( SNAKE.body[i].xPos, SNAKE.body[i].yPos );
      }

      drawApple();

    }
  }, framesPerSecond );


  window.addEventListener( 'keydown', ( e ) => {
    e.preventDefault();
    switch ( e.key ) {
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
  } );
};

