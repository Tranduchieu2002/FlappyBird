const cvs = document.querySelector("canvas");
const ctx = cvs.getContext("2d");
var bird = new Image();
var bg = new Image();
let fg = new Image();
let pipeSouth = new Image();
let pipeNorth = new Image();
console.log(pipeNorth.length, pipeSouth.length);
fg.src =
  "https://raw.githubusercontent.com/CodeExplainedRepo/FlappyBird-JavaScript/master/images/fg.png";
pipeNorth.src =
  "https://raw.githubusercontent.com/CodeExplainedRepo/FlappyBird-JavaScript/master/images/pipeNorth.png";
pipeSouth.src =
  "https://raw.githubusercontent.com/CodeExplainedRepo/FlappyBird-JavaScript/master/images/pipeSouth.png";
bird.src =
  "https://raw.githubusercontent.com/CodeExplainedRepo/FlappyBird-JavaScript/master/images/bird.png";
bg.src =
  "https://raw.githubusercontent.com/CodeExplainedRepo/FlappyBird-JavaScript/master/images/bg.png";
(function draw() {
  const fh = 50;
  const hC = cvs.height;
  let Bx = 50;
  let By = 50;
  let hPassForCg = 7 * fh;
  ctx.drawImage(bg, 0, 0);
  ctx.drawImage(bird, 0, 0, 50, 50);
  ctx.drawImage(pipeSouth, 130, hC - hPassForCg);
  ctx.drawImage(pipeNorth,130,0)
  ctx.drawImage(fg, 0, hC - fg.height);
  requestAnimationFrame(draw);
})();
