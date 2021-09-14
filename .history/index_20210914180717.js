const cvs = document.querySelector("canvas");
const ctx = cvs.getContext("2d");
var bird = new Image();
var bg = new Image();
let fg = new Image();
let pipeSouth = new Image();
let pipeNorth = new Image();
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
console.log();
const Game = function ()  {
  return {
    init() {
      this.draw();
      this.loaded();
    },
    draw() {
      const fh = 50;
      const hC = cvs.height;
      let Bx = 12;
      let By = 200;
      let hPassForCg = 90;
      ctx.drawImage(bg, 0, 0);
      ctx.drawImage(bird, Bx, By, 30, 30);
      ctx.drawImage(pipeSouth, 130, hPassForCg + pipeNorth.height);
      ctx.drawImage(pipeNorth, 130, 0);
      ctx.drawImage(fg, 0, hC - fg.height);
      requestAnimationFrame(draw);
    },
    loaded() {
      window.addEventListener("keypress", (e) => {
        let KeyID = e.keyCode;
        if (KeyID == 32) {
          console.log("done");
        }
      });
    },
  };
};
Game.init()
