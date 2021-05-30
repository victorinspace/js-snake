window.onload = () => {
  // *** == Debuging Env == *** //
  const DEBUG = false;
  if ( DEBUG === true ) {
    APPLE.x = 140;
    APPLE.y = 200;
    framesPerSecond = 500;
  }

  let canvas = document.getElementById( 'gameCanvas' );
  let canvasContext = canvas.getContext( '2d' );
  let playerScore = 0;
  let framesPerSecond = 1000 / 8;
  const GRID_SIZE = 20

  const APPLE = {
    x: Math.floor( Math.random() * canvas.width / GRID_SIZE ) * GRID_SIZE,
    y: Math.floor( Math.random() * canvas.width / GRID_SIZE ) * GRID_SIZE
  };

  const SNAKE = {
    direction: 'right',
    body: [
      { x: 80, y: 200 },
      { x: 60, y: 200 },
      { x: 40, y: 200 },
      { x: 20, y: 200 },
    ]
  };

  let gameInterval = setInterval( initializeGame, framesPerSecond );

  const updatePlayerScore = () => {
    playerScore++;
    const scoreDisplay = document.getElementById( 'player-score' );
    scoreDisplay.innerText = `Score: ${playerScore}`;
  };

  const drawCanvas = () => {
    canvasContext.fillStyle = 'black';
    canvasContext.rect( 0, 0, canvas.width, canvas.height );
    canvasContext.fill();
  };

  const drawSnake = () => {
    for ( const snakePart of SNAKE.body ) {
      canvasContext.beginPath();
      canvasContext.fillStyle = 'green';
      canvasContext.rect(
        snakePart.x,
        snakePart.y,
        GRID_SIZE,
        GRID_SIZE
      );
      canvasContext.fill();
      canvasContext.closePath();
    }
  };

  const drawApple = () => {
    canvasContext.beginPath();
    canvasContext.fillStyle = 'red';
    canvasContext.rect(
      APPLE.x,
      APPLE.y,
      GRID_SIZE,
      GRID_SIZE
    );
    canvasContext.fill();
    canvasContext.closePath();
  };

  const moveSnake = () => {
    const snakeCopy = SNAKE.body.map( snakePart => Object.assign( {}, snakePart ) )

    switch ( SNAKE.direction ) {
      case 'up':
        SNAKE.body[0].y -= GRID_SIZE;
        break;
      case 'right':
        SNAKE.body[0].x += GRID_SIZE;
        break;
      case 'down':
        SNAKE.body[0].y += GRID_SIZE;
        break;
      case 'left':
        SNAKE.body[0].x -= GRID_SIZE;
        break;
    }

    for ( let i = 1; i < SNAKE.body.length; i++ ) {
      SNAKE.body[i] = snakeCopy[i - 1];
    }
  }

  const doesSnakeEatApple = () => {
    if ( SNAKE.body[0].x === APPLE.x && SNAKE.body[0].y === APPLE.y ) {
      updatePlayerScore();
      generateNewSnakePart( SNAKE, GRID_SIZE );
      generateNewApple( APPLE, canvas, GRID_SIZE );
    }
  }

  const doesSnakeHitItself = () => {
    for ( let i = 1; i < SNAKE.body.length; i++ ) {
      let snakePart = SNAKE.body[i];

      if ( SNAKE.body[0].x === snakePart.x && SNAKE.body[0].y === snakePart.y ) {
        gameOver();
      }
    }
  }

  const gameOver = () => {
    clearInterval( gameInterval );
    canvasContext.clearRect( 0, 0, canvas.width, canvas.height );
    canvasContext.fillStyle = 'white';
    canvasContext.font = '50px Verdana';
    canvasContext.fillText(
      'Game Over!',
      canvas.width / 8,
      canvas.height / 4
    );
    canvasContext.font = '25px Verdana';
    canvasContext.fillText(
      'Play again? Press space bar',
      canvas.width / 16,
      canvas.height / 2
    );
  }

  function initializeGame () {
    moveSnake();
    doesSnakeEatApple();

    if ( checkIfSnakeHitsAWall() ) {
      gameOver();
    } else if ( checkIfSnakeHitsAWall() ) {
      gameOver();
    } else {
      drawCanvas();
      drawApple();
      drawSnake();
      doesSnakeHitItself();
    }
  }

  function checkIfSnakeHitsAWall () {
    return (
      SNAKE.body[0].y < 0 ||
      SNAKE.body[0].y === canvas.width ||
      SNAKE.body[0].x < 0 ||
      SNAKE.body[0].x === canvas.width
    );
  }

  function generateNewSnakePart ( SNAKE, GRID_SIZE ) {
    let lastSnakePart = SNAKE.body[SNAKE.body.length - 1];

    SNAKE.body.push( { x: lastSnakePart + GRID_SIZE, y: lastSnakePart + GRID_SIZE } );
  }

  function generateNewApple ( APPLE, canvas, GRID_SIZE ) {
    APPLE.x = Math.floor( Math.random() * canvas.width / GRID_SIZE ) * GRID_SIZE;
    APPLE.y = Math.floor( Math.random() * canvas.width / GRID_SIZE ) * GRID_SIZE;
  }

  window.addEventListener( 'keydown', ( e ) => {
    e.preventDefault();
    switch ( e.key ) {
      case 'ArrowUp':
        if ( SNAKE.direction === 'down' ) return;
        SNAKE.direction = 'up';
        break;
      case 'ArrowRight':
        if ( SNAKE.direction === 'left' ) return;
        SNAKE.direction = 'right';
        break;
      case 'ArrowDown':
        if ( SNAKE.direction === 'up' ) return;
        SNAKE.direction = 'down';
        break;
      case 'ArrowLeft':
        if ( SNAKE.direction === 'right' ) return;
        SNAKE.direction = 'left';
        break;
      case ' ':
        window.location.reload();
    }
  } );
};
