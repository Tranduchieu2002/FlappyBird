const cvs = document.querySelector("canvas");
const ctx = cvs.getContext("2d");
var img = new Image();
img.onload = draw();
img.src(
  "https://user-images.githubusercontent.com/18351809/46888871-624a3900-ce7f-11e8-808e-99fd90c8a3f4.png"
);
function draw() {
  ctx.drawImage(img, 50, 110);
}

