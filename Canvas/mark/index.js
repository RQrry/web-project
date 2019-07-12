const WIDTH = 800;
const HEIGHT = 600;
let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');
canvas.width = WIDTH; // 画布宽
canvas.height = HEIGHT; // 画布高
canvas.style.border = '1px solid #ddd';
let type = 'rectangle';
let points = []; // 点
const rects = []; // 矩形
const polygons = []; // 多边形
let x0, y0, x1, y1; // 鼠标点击、抬起坐标
let x, y;

function Draw (ctx) {
  this.ctx = ctx;
  this.lineColor = 'red';
  this.fillColor = 'rgba(0,0,0,0.2)';
  this.lineWidth = 1;
}

Draw.prototype = {
  init: function () {
    this.ctx.strokeStyle = this.lineColor;
    this.ctx.fillStyle = this.fillColor;
    this.ctx.lineWidth = this.lineWidth;
  },
  // 文字
  text: function (x0, y0, text) {
    this.ctx.fillStyle = this.lineColor;
    this.ctx.font = '14px Microsoft YaHei';
    this.ctx.fillText(text, x0+10, y0+20);
    this.ctx.strokeText(text, x0+10, y0+20);
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
    this.ctx.stroke();
  },
  // 画多边形
  polygon: function (points) {
    if (points.length) {
      for (let i=0, len=points.length; i<len-1; i++) {
        let x0 = points[i][0];
        let y0 = points[i][1];
        let x1 = points[i+1][0];
        let y1 = points[i+1][1];
        this.line(x0, y0, x1, y1);
      }
    }
  },
  // 重绘
  redraw: function (rects, polygons) {
    if (rects.length) {
      for (let i=0, len=rects.length; i<len; i++) {
        let x0 = rects[i].points[0];
        let y0 = rects[i].points[1];
        let x1 = rects[i].points[2];
        let y1 = rects[i].points[3];
        this.rectangle(x0, y0, x1, y1);
        this.ctx.fill();
        this.text(x0, y0, rects[0].text+i);
      }
    }
    if (polygons) {
      for (let i=0, len=polygons.length; i<len; i++) {
        this.init();
        this.ctx.beginPath();
        let x0 = polygons[i].points[0][0];
        let y0 = polygons[i].points[0][1];
        this.ctx.moveTo(x0, y0);
        for (let j=1, len=polygons[i].points.length; j<len; j++) {
          let x1 = polygons[i].points[j][0];
          let y1 = polygons[i].points[j][1];
          this.ctx.lineTo(x1, y1);
        }
        this.ctx.closePath();
        this.ctx.stroke();
        this.ctx.fill();
        this.text(x0, y0, polygons[0].text+i);
      }
    }
  }
}

// 去掉浏览器右击默认事件
document.oncontextmenu = function () {
  return false;
}

// 选择画图类型
$('.control button').each(function (index, ele) {
  $(ele).click(function () {
    $('.control button').removeClass('active');
    $(this).addClass('active');
    type = $(this).attr('data-type');
    x0 = undefined; y0 = undefined;
  });
});

canvas.onmousedown = function (e) {
  if (e.button === 0) {
    x0 = e.offsetX;
    y0 = e.offsetY;
    let draw = new Draw(ctx);
    if (type === 'polygon') {
      points.push([x0, y0]);
      draw[type](points);
    }

    canvas.onmousemove = function (e) {
      x1 = e.offsetX;
      y1 = e.offsetY;
      if (type === 'rectangle') {
        ctx.clearRect(0, 0, WIDTH, HEIGHT);
        draw[type](x0, y0, x1, y1);
        draw['redraw'](rects, polygons);
      }
    }
  } else if (e.button === 2) { // 鼠标右键闭合多边形
    if (type === 'polygon') {
      if (points.length > 2) {
        polygons.push({
          text: '多边形',
          points: points
        })
        points = [];
        x0 = undefined; y0 = undefined;
      }
      let draw = new Draw(ctx);
      ctx.clearRect(0, 0, WIDTH, HEIGHT);
      draw['redraw'](rects, polygons);
    }
  }
}

document.onmousemove = function (e) {
  if (type === 'polygon') {
    x1 = e.offsetX;
    y1 = e.offsetY;
    let draw = new Draw(ctx);
    ctx.clearRect(0, 0, WIDTH, HEIGHT);
    draw['line'](x0, y0, x1, y1);
    draw[type](points);
    draw['redraw'](rects, polygons);
  }
}

canvas.onmouseup = function (e) {
  let draw = new Draw(ctx);
  if (e.button === 0) {
    if (type === 'rectangle') {
      if (x0 && y0 && x1 && y1) {
        let rectPoints = [x0, y0, x1, y1];
        rects.push({
          text: '矩形',
          points: rectPoints
        })
      }
      ctx.clearRect(0, 0, WIDTH, HEIGHT);
      draw['redraw'](rects, polygons);
      canvas.onmousemove = null;
    }
  }
}