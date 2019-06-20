(function () {
  var WIDTH = 600;
  var HEIGHT = 600;
  var canvas = document.getElementById('canvas');
  var ctx = canvas.getContext('2d');
  canvas.width = WIDTH;
  canvas.height = HEIGHT;
  canvas.style.border = '1px solid #ddd';

  var img = new Image();
  img.src ='./lufei.jpeg';
  var x0 = 300, y0 = 300;
  img.onload = function () {
    var imgWidth = img.width;
    var imgHeight = img.height;
    var rpgWidth = imgWidth / 4;
    var rpgHeight = imgHeight / 4;
    var i = 0;
    var j = 0;
    var speed = 2;
    var timer = setInterval(function () {
      ctx.clearRect(0, 0, WIDTH, HEIGHT);
      ctx.drawImage(img, i % 4 * rpgWidth, j * rpgHeight, rpgWidth, rpgHeight, x0, y0, rpgWidth, rpgHeight);
      keyEvent();
    }, 100);

    // 键盘事件 判断方向和画布边界
    function keyEvent() {
      document.onkeydown = function (e) {
        e = e || window.event;
        switch (e.keyCode) {
          case 37: // left
            j = 1;
            (x0 > 0) && (x0 -= speed);
            break;
          case 38: // top
            j = 3;
            (y0 > -8) && (y0 -= speed);
            break;
          case 39: // right
            j = 2;
            (x0 < WIDTH - rpgWidth) && (x0 += speed);
            break;
          case 40: // bottom
            j = 0;
            (y0 < HEIGHT - rpgHeight) && (y0 += speed);
            break;
        }
        i++;
      }
      document.onkeyup = function (e) {
        e = e || window.event;
        switch (e.keyCode) {
          case 37:
            j = 1;
            break;
          case 38:
            j = 3;
            break;
          case 39:
            j = 2;
            break;
          case 40:
            j = 0;
            break;
        }
        i = 0;
      }
    }
  }
})();