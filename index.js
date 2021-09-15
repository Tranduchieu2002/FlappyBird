// SELECT CVS
const cvs = document.getElementById("canvas");
const ctx = cvs.getContext("2d");

// GAME VARS AND CONSTS
let frames = 0;
const DEGREE = Math.PI / 180;

// LOAD SPRITE IMAGE
const sprite = new Image();
sprite.src = "img/sprite.png";

// GAME STATE
const state = {
  current: 0,
  getReady: 0,
  game: 1,
  over: 2,
};

// START BUTTON COORD
const startBtn = {
  x: 120,
  y: 263,
  w: 83,
  h: 29,
};

// CONTROL THE GAME

/* cvs.addEventListener("keypress",function(evt) {
  console.log(evt.__proto__)
  if(evt.key == 13)
  console.log(evt.key)
  switch (state.current) {
    case state.getReady:
      state.current = state.game;
      break;
    case state.game:
      if (flappyBird.y - flappyBird.radius <= 0) return;
      flappyBird.flap();
      break;
    case state.over:
      let rect = cvs.getBoundingClientRect();
      let clickX = evt.clientX - rect.left;
      let clickY = evt.clientY - rect.top;

      // CHECK IF WE CLICK ON THE START BUTTON
      if (
        clickX >= startBtn.x &&
        clickX <= startBtn.x + startBtn.w &&
        clickY >= startBtn.y &&
        clickY <= startBtn.y + startBtn.h
      ) {
        pipes.reset();
        flappyBird.speedReset();
        score.reset();
        state.current = state.getReady;
      }
      break;
  }
}) */
// handle space to make the flying bird

function handleSpace(event) {
  if (event.keyCode == 32) {
    flappyBird.flap();
    handleClick(event)
    console.log(state.current);
    updateSpace(state.current);
  }
}
window.onload = function () {
  document.addEventListener("keydown", handleSpace);
};
function updateSpace(current) {
  if (current == state.over) {
    document.removeEventListener("keydown", handleSpace);
  }
  if (current == state.getReady)
    document.addEventListener("keydown", handleSpace);
}
/// handle click to controller game
cvs.onclick = handleClick;
function handleClick(evt) {
  updateSpace(state.current);
  switch (state.current) {
    case state.getReady:
      state.current = state.game;
      break;
    case state.game:
      window.onload = function () {
        document.addEventListener("keydown", handleSpace);
      };
      if (flappyBird.y - flappyBird.radius <= 0) return;
      flappyBird.flap();
      break;
    case state.over:
      let rect = cvs.getBoundingClientRect();
      let clickX = evt.clientX - rect.left;
      let clickY = evt.clientY - rect.top;
      // CHECK IF WE CLICK ON THE START BUTTON
      if (
        clickX >= startBtn.x &&
        clickX <= startBtn.x + startBtn.w &&
        clickY >= startBtn.y &&
        clickY <= startBtn.y + startBtn.h
      ) {
        pipes.reset();
        flappyBird.speedReset();
        score.reset();

        state.current = state.getReady;
      }
      break;
  }
}
// BACKGROUND
const bg = {
  sX: 0,
  sY: 0,
  w: 275,
  h: 226,
  x: 0,
  y: cvs.height - 226,

  draw: function () {
    ctx.drawImage(
      sprite,
      this.sX,
      this.sY,
      this.w,
      this.h,
      this.x,
      this.y,
      this.w,
      this.h
    );

    ctx.drawImage(
      sprite,
      this.sX,
      this.sY,
      this.w,
      this.h,
      this.x + this.w,
      this.y,
      this.w,
      this.h
    );
  },
};

// FOREGROUND
const fg = {
  sX: 276,
  sY: 0,
  w: 224,
  h: 112,
  x: 0,
  y: cvs.height - 112,

  dx: 2,

  draw: function () {
    ctx.drawImage(
      sprite,
      this.sX,
      this.sY,
      this.w,
      this.h,
      this.x,
      this.y,
      this.w,
      this.h
    );

    ctx.drawImage(
      sprite,
      this.sX,
      this.sY,
      this.w,
      this.h,
      this.x + this.w,
      this.y,
      this.w,
      this.h
    );
  },

  update: function () {
    if (state.current == state.game) {
      this.x = (this.x - this.dx) % (this.w / 2);
    }
  },
};

// flappyBird
const flappyBird = {
  animation: [
    { sX: 276, sY: 112 },
    { sX: 276, sY: 139 },
    { sX: 276, sY: 164 },
    { sX: 276, sY: 139 },
  ],
  x: 50,
  y: 150,
  w: 34,
  h: 26,

  radius: 10,

  frame: 0,

  gravity: 0.25,
  jump: 4,
  speed: 0,
  rotation: 0,

  draw: function () {
    let flappyBird = this.animation[this.frame];

    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(this.rotation);
    ctx.drawImage(
      sprite,
      flappyBird.sX,
      flappyBird.sY,
      this.w,
      this.h,
      -this.w / 2,
      -this.h / 2,
      this.w,
      this.h
    );

    ctx.restore();
  },

  flap: function () {
    this.speed = -this.jump + 0.75;
  },

  update: function () {
    // IF THE GAME STATE IS GET READY STATE, THE flappyBird MUST FLAP SLOWLY
    this.period = state.current == state.getReady ? 10 : 5;
    // WE INCREMENT THE FRAME BY 1, EACH PERIOD
    this.frame += frames % this.period == 0 ? 1 : 0;
    // FRAME GOES FROM 0 To 4, THEN AGAIN TO 0
    this.frame = this.frame % this.animation.length;

    if (state.current == state.getReady) {
      this.y = 150; // RESET POSITION OF THE flappyBird AFTER GAME OVER
      this.rotation = 0 * DEGREE;
    } else {
      this.speed += this.gravity;
      this.y += this.speed;

      if (this.y + this.h / 2 >= cvs.height - fg.h) {
        this.y = cvs.height - fg.h - this.h / 2;
        if (state.current == state.game) {
          state.current = state.over;
        }
      }

      // IF THE SPEED IS GREATER THAN THE JUMP MEANS THE flappyBird IS FALLING DOWN
      if (this.speed >= this.jump) {
        this.rotation = 90 * DEGREE;
        this.frame = 1;
      } else {
        this.rotation = -20 * DEGREE;
      }
    }
  },
  speedReset: function () {
    this.speed = 0;
  },
};

// GET READY MESSAGE
const getReady = {
  sX: 0,
  sY: 228,
  w: 173,
  h: 152,
  x: cvs.width / 2 - 173 / 2,
  y: 80,

  draw: function () {
    if (state.current == state.getReady) {
      ctx.drawImage(
        sprite,
        this.sX,
        this.sY,
        this.w,
        this.h,
        this.x,
        this.y,
        this.w,
        this.h
      );
    }
  },
};

// GAME OVER MESSAGE
const gameOver = {
  sX: 175,
  sY: 228,
  w: 225,
  h: 202,
  x: cvs.width / 2 - 225 / 2,
  y: 90,

  draw: function () {
    if (state.current == state.over) {
      ctx.drawImage(
        sprite,
        this.sX,
        this.sY,
        this.w,
        this.h,
        this.x,
        this.y,
        this.w,
        this.h
      );
    }
  },
};

// PIPES
const pipes = {
  position: [],

  top: {
    sX: 553,
    sY: 0,
  },
  bottom: {
    sX: 502,
    sY: 0,
  },

  w: 53,
  h: 400,
  gap: 85,
  maxYPos: -150,
  dx: 2,

  draw: function () {
    for (let i = 0; i < this.position.length; i++) {
      let p = this.position[i];

      let topYPos = p.y;
      let bottomYPos = p.y + this.h + this.gap;

      // top pipe
      ctx.drawImage(
        sprite,
        this.top.sX,
        this.top.sY,
        this.w,
        this.h,
        p.x,
        topYPos,
        this.w,
        this.h
      );

      // bottom pipe
      ctx.drawImage(
        sprite,
        this.bottom.sX,
        this.bottom.sY,
        this.w,
        this.h,
        p.x,
        bottomYPos,
        this.w,
        this.h
      );
    }
  },

  update: function () {
    if (state.current !== state.game) return;

    if (frames % 100 == 0) {
      this.position.push({
        x: cvs.width,
        y: this.maxYPos * (Math.random() + 1),
      });
    }
    for (let i = 0; i < this.position.length; i++) {
      let p = this.position[i];

      let bottomPipeYPos = p.y + this.h + this.gap;

      // COLLISION DETECTION
      // TOP PIPE
      if (
        flappyBird.x + flappyBird.radius > p.x &&
        flappyBird.x - flappyBird.radius < p.x + this.w &&
        flappyBird.y + flappyBird.radius > p.y &&
        flappyBird.y - flappyBird.radius < p.y + this.h
      ) {
        state.current = state.over;
      }
      // BOTTOM PIPE
      if (
        flappyBird.x + flappyBird.radius > p.x &&
        flappyBird.x - flappyBird.radius < p.x + this.w &&
        flappyBird.y + flappyBird.radius > bottomPipeYPos &&
        flappyBird.y - flappyBird.radius < bottomPipeYPos + this.h
      ) {
        state.current = state.over;
      }

      // MOVE THE PIPES TO THE LEFT
      p.x -= this.dx;

      // if the pipes go beyond canvas, we delete them from the array
      if (p.x + this.w <= 0) {
        this.position.shift();
        score.value += 1;
        score.best = Math.max(score.value, score.best);
        localStorage.setItem("best", score.best);
      }
    }
  },

  reset: function () {
    this.position = [];
  },
};

// SCORE
const score = {
  best: parseInt(localStorage.getItem("best")) || 0,
  value: 0,

  draw: function () {
    ctx.fillStyle = "#FFF";
    ctx.strokeStyle = "#000";

    if (state.current == state.game) {
      ctx.lineWidth = 2;
      ctx.font = "35px Teko";
      ctx.fillText(this.value, cvs.width / 2, 50);
      ctx.strokeText(this.value, cvs.width / 2, 50);
    } else if (state.current == state.over) {
      // SCORE VALUE
      ctx.font = "25px Teko";
      ctx.fillText(this.value, 225, 186);
      ctx.strokeText(this.value, 225, 186);
      // BEST SCORE
      ctx.fillText(this.best, 225, 228);
      ctx.strokeText(this.best, 225, 228);
    }
  },

  reset: function () {
    this.value = 0;
  },
};

// DRAW
function draw() {
  ctx.fillStyle = "#70c5ce";
  ctx.fillRect(0, 0, cvs.width, cvs.height);

  bg.draw();
  pipes.draw();
  fg.draw();
  flappyBird.draw();
  getReady.draw();
  gameOver.draw();
  score.draw();
}

// UPDATE
function update() {
  flappyBird.update();
  fg.update();
  pipes.update();
}

// LOOP
function loop() {
  update();
  draw();
  frames++;

  requestAnimationFrame(loop);
}
loop();
