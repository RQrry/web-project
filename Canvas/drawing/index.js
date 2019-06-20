const WIDTH = 600;
const HEIGHT = 600;
var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
canvas.width = WIDTH;
canvas.height = HEIGHT;
canvas.style.border = '1px solid #ddd';
var mode = 'stroke';
var color = '#000';
var lineWidth = 1;
var type = 'line';
var n = 3;
var typeBtn = $('.type li button');
var modeBtn = $('.mode li button');
var colorBtn = $('.color input[type=color]');
var lineWidthBtn = $('.lineWidth input[type=number]');
var polygonBtn = $('.polygon input[type=number]');
var cancel = $('.cancel');
var clear = $('.clear');
var save = $('.save');
var arr = [];

function Draw(ctx, setting) {
  this.ctx = ctx;
  this.mode = setting.mode || 'stroke';
  this.color = setting.color || '#000';
  this.lineWidth = setting.lineWidth || 1;
}

Draw.prototype = {
  init: function () {
    this.ctx.strokeStyle = this.color;
    this.ctx.fillStyle = this.color;
    this.ctx.lineWidth = this.lineWidth;
  },
  line: function (x0, y0, x1, y1) {
    this.init();
    this.ctx.beginPath();
    this.ctx.moveTo(x0, y0);
    this.ctx.lineTo(x1, y1);
    this.ctx.stroke();
  },
  rectangle: function (x0, y0, x1, y1) {
    this.init();
    this.ctx.beginPath();
    this.ctx.rect(x0, y0, x1-x0, y1-y0);
    if (this.mode === 'stroke') {
      this.ctx.stroke();
    } else if (this.mode === 'fill') {
      this.ctx.fill();
    }
  },
  circle: function (x0, y0, x1, y1) {
    this.init();
    var radius = Math.sqrt(Math.pow(x0 - x1, 2) + Math.pow(y0 - y1, 2));
    this.ctx.beginPath();
    this.ctx.arc(x0, y0, radius, 0, 2 * Math.PI);
    if (this.mode === "stroke") {
        this.ctx.stroke();
    } else if (this.mode === "fill") {
        this.ctx.fill();
    }
  },
  polygon: function (x0, y0, x1, y1, n) {
    this.init();
    var radius = Math.sqrt(Math.pow(x0 - x1, 2) + Math.pow(y0 - y1, 2));
    this.ctx.save();
    this.ctx.translate(x0, y0);
    this.ctx.beginPath();
    var x = radius * Math.sin(Math.PI / n);
    var y = radius * Math.cos(Math.PI / n);
    this.ctx.moveTo(x, y);
    for(var i=0; i<=n; i++) {
      this.ctx.rotate(Math.PI * 2 / n);
      this.ctx.lineTo(x, y);
    }
    if (this.mode === "stroke") {
      this.ctx.stroke();
    } else if (this.mode === "fill") {
        this.ctx.fill();
    }
    this.ctx.restore();
  },
  pencil: function (x0, y0, x1, y1) {
    this.init();
    this.ctx.lineCap = 'round';
    this.ctx.lineTo(x1, y1);
    this.ctx.stroke();
  },
  eraser: function (x0, y0, x1, y1) {
    this.ctx.lineWidth = this.lineWidth;
    this.ctx.strokeStyle = '#fff';
    this.ctx.lineCap = 'round';
    this.ctx.lineTo(x1, y1);
    this.ctx.stroke();
  }
}

typeBtn.each(function (index, ele) {
  $(ele).click(function () {
    typeBtn.removeClass('active');
    $(this).addClass('active');
    type = $(this).attr('data-type');
  });
});

modeBtn.each(function (index, ele) {
  $(ele).click(function () {
    modeBtn.removeClass('active');
    $(this).addClass('active');
    mode = $(this).attr('data-mode');
  });
});

cancel.click(function () {
  arr.pop();
  ctx.clearRect(0, 0, WIDTH, HEIGHT);
  if (arr.length > 0) {
    ctx.putImageData(arr[arr.length - 1], 0, 0, 0, 0, WIDTH, HEIGHT);
  }
});

clear.click(function () {
  arr = [];
  ctx.clearRect(0, 0, WIDTH, HEIGHT);
});

save.click(function () {
  var url = canvas.toDataURL('image/png');
  var link = document.createElement('a');
  link.download = 'image';
  link.href = url;
  link.click();
})

colorBtn.change(function () {
  color = this.value;
});

lineWidthBtn.change(function () {
  lineWidth = this.value;
});

polygonBtn.change(function () {
  n = this.value;
});

var x0,y0,x1,y1;
canvas.onmousedown = function (e) {
  x0 = e.offsetX;
  y0 = e.offsetY;
  if (type === 'pencil' || type === 'eraser') {
    ctx.beginPath();
    ctx.moveTo(x0, y0);
  }
  var draw = new Draw(ctx, {mode: mode, color: color, lineWidth: lineWidth});

  canvas.onmousemove = function (e) {
    x1 = e.offsetX;
    y1 = e.offsetY;
    ctx.clearRect(0, 0, WIDTH, HEIGHT);
    if (arr.length > 0) {
      ctx.putImageData(arr[arr.length - 1], 0, 0, 0, 0, WIDTH, HEIGHT);
    }
    if (type === 'polygon') {
      draw[type](x0, y0, x1, y1, n);
    } else {
      draw[type](x0, y0, x1, y1);
    }
  }

  document.onmouseup = function (e) {
    canvas.onmousemove = null;
    document.onmouseup = null;
    arr.push(ctx.getImageData(0, 0, WIDTH, HEIGHT));
  }
}