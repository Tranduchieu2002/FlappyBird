const cvs = document.querySelector("canvas");
const ctx = cvs.getContext("2d");
var bird = new Image();
var bg = new Image();
bird.src =
  "https://e7.pngegg.com/pngimages/328/754/png-clipart-flappy-bird-blue-minecraft-bird-flappy-bird-bird.png";
bg.src =
  "https://user-images.githubusercontent.com/18351809/46888871-624a3900-ce7f-11e8-808e-99fd90c8a3f4.png";
(function draw() {
  const fh = 50
  const hC = cvs.height
  ctx.drawImage(bg,0,0)
  ctx.drawImage(bird,0,0,50,50)
  requestAnimationFrame(draw)
})();
