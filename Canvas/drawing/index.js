const WIDTH = 600;
const HEIGHT = 600;
var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
canvas.width = WIDTH; // 画布宽
canvas.height = HEIGHT; // 画布高
canvas.style.border = '1px solid #ddd';
var mode = 'stroke'; // 描边或填充
var color = '#000'; // 颜色
var lineWidth = 1; // 线宽
var type = 'line'; // 画图类型
var n = 3; // 正多边形边数
var typeBtn = $('.type li button'); // 选择画图类型
var modeBtn = $('.mode li button'); // 选择描边或填充
var colorBtn = $('.color input[type=color]'); // 选择颜色
var lineWidthBtn = $('.lineWidth input[type=number]'); // 选择画笔宽
var polygonBtn = $('.polygon input[type=number]'); // 选择画正多边形
var cancel = $('.cancel'); // 撤销按钮
var clear = $('.clear'); // 清空按钮
var save = $('.save'); // 保存按钮
var arr = []; // 画布像素点

function Draw(ctx, setting) {
  this.ctx = ctx;
  this.mode = setting.mode || 'stroke'; // 默认描边
  this.color = setting.color || '#000'; // 默认黑色
  this.lineWidth = setting.lineWidth || 1; // 默认线宽1px
}

Draw.prototype = {
  // 初始化画笔颜色、线宽
  init: function () {
    this.ctx.strokeStyle = this.color;
    this.ctx.fillStyle = this.color;
    this.ctx.lineWidth = this.lineWidth;
  },
  // 画直线
  line: function (x0, y0, x1, y1) {
    this.init();
    this.ctx.beginPath();
    this.ctx.moveTo(x0, y0);
    this.ctx.lineTo(x1, y1);
    this.ctx.stroke();
  },
  // 画矩形
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
  // 画圆
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
  // 画正多边形
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
  // 铅笔
  pencil: function (x0, y0, x1, y1) {
    this.init();
    this.ctx.lineCap = 'round';
    this.ctx.lineTo(x1, y1);
    this.ctx.stroke();
  },
  // 橡皮
  eraser: function (x0, y0, x1, y1) {
    this.ctx.lineWidth = this.lineWidth;
    this.ctx.strokeStyle = '#fff';
    this.ctx.lineCap = 'round';
    this.ctx.lineTo(x1, y1);
    this.ctx.stroke();
  }
}

// 选择画图类型
typeBtn.each(function (index, ele) {
  $(ele).click(function () {
    typeBtn.removeClass('active');
    $(this).addClass('active');
    type = $(this).attr('data-type');
  });
});

// 选择描边或填充
modeBtn.each(function (index, ele) {
  $(ele).click(function () {
    modeBtn.removeClass('active');
    $(this).addClass('active');
    mode = $(this).attr('data-mode');
  });
});

// 撤销操作
cancel.click(function () {
  arr.pop();
  ctx.clearRect(0, 0, WIDTH, HEIGHT);
  if (arr.length > 0) {
    ctx.putImageData(arr[arr.length - 1], 0, 0, 0, 0, WIDTH, HEIGHT);
  }
});

// 清空画布
clear.click(function () {
  arr = [];
  ctx.clearRect(0, 0, WIDTH, HEIGHT);
});

// 将画布保存为图片
save.click(function () {
  var url = canvas.toDataURL('image/png');
  var link = document.createElement('a');
  link.download = 'image';
  link.href = url;
  link.click();
})

// 选择颜色
colorBtn.change(function () {
  color = this.value;
});

// 选择画笔宽
lineWidthBtn.change(function () {
  lineWidth = this.value;
});

// 选择正多边形边数
polygonBtn.change(function () {
  n = this.value;
});

// x0 y0 鼠标点击坐标
// x1 y1 鼠标抬起坐标
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