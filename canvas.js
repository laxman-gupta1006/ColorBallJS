var canvas = document.querySelector("canvas");
canvas.height = window.innerHeight;
canvas.width = window.innerWidth;
var c = canvas.getContext("2d");
window.addEventListener("resize", function () {
  canvas.height = window.innerHeight;
  canvas.width = window.innerWidth;
});
var colors = [
  "#F98866",
  "#FF420E",
  "#80BD9E",
  "#89DA56",
  "#F95700FF",
  "#00375d",
  "#900036",
  "#DDA0DD",
];
function Circle(x, y, dx, dy, color, size) {
  this.x = x;
  this.y = y;
  this.dx = dx;
  this.dy = dy;
  this.color = color;
  this.size = size;
  this.draw = function () {
    c.beginPath();
    c.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
    c.fillStyle = this.color;
    c.fill();
  };
  this.update = function (circles, elem) {
    if (this.x > innerWidth || this.x < 0) {
      this.dx = -this.dx;
    } else if (this.y > innerHeight || this.y < 0) {
      this.dy = -this.dy;
    }
    this.x = this.x + this.dx;
    this.y = this.y + this.dy;
    var distance = [];
    for (k = 0; k < circles.length; k++) {
      var dis = Math.sqrt(
        Math.pow(circles[k].x - this.x, 2) + Math.pow(circles[k].y - this.y, 2)
      );
      distance.push(dis);
    }
    this.draw(circles, distance);
  };
}
var circles = [];
for (i = 0; i <= 40; i++) {
  x = Math.random() * innerWidth * 0.8;
  y = Math.random() * innerHeight * 0.8;
  dx = Math.random() * [+3, -2][Math.floor(Math.random() * 2)];
  dy = Math.random() * [+2, -3][Math.floor(Math.random() * 2)];
  size = Math.random() * 10;
  color = colors[Math.floor(Math.random() * colors.length)];
  circles.push(new Circle(x, y, dx, dy, color, size));
}
function animate() {
  window.requestAnimationFrame(animate);
  c.clearRect(0, 0, innerWidth, innerHeight);
  for (i = 0; i < circles.length; i++) {
    circles[i].update(circles, i);
  }
}
animate();

// On click adding random numbers of circle
window.addEventListener("click", function (event) {
  for (i = 0; i <= Math.floor(Math.random() * 10); i++)
    for (i = 0; i <= 1; i++) {
      x = event.clientX;
      y = event.clientY;
      dx = Math.random() * [+3, -2][Math.floor(Math.random() * 2)];
      dy = Math.random() * [+2, -3][Math.floor(Math.random() * 2)];
      color = colors[Math.floor(Math.random() * colors.length)];
      size = Math.random() * 10;
      circles.push(new Circle(x, y, dx, dy, color, size));
    }
});
