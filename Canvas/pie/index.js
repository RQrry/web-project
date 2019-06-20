(function () {
  var canvas = document.getElementById('myCanvas');
  var ctx = canvas.getContext('2d');
  canvas.width = 600;
  canvas.height = 600;
  canvas.style.border = '1px solid #ddd';

  var data = [{
    value: .2,
    color: 'red',
    title: 'title1'
  },{
    value: .4,
    color: 'orange',
    title: 'title2'
  },{
    value: .3,
    color: 'yellow',
    title: 'title3'
  },{
    value: .1,
    color: 'green',
    title: 'title4'
  }];

  var angle0 = -90;
  var x0 = 300, y0 = 300;
  var radius = 100;
  for(var i=0; i<data.length; i++) {
    ctx.beginPath();
    ctx.moveTo(x0, y0);
    var angle = data[i].value * 360;
    var startAngle = angle0 * Math.PI / 180;
    var endAngle = (angle0 + angle) * Math.PI / 180;
    ctx.fillStyle = data[i].color;
    ctx.arc(x0, y0, radius, startAngle, endAngle);
    ctx.fill();
    var textAngle = angle0 + angle / 2;
    var x1 = x0 + Math.cos(textAngle * Math.PI / 180) * (radius + 20);
    var y1 = y0 + Math.sin(textAngle * Math.PI / 180) * (radius + 20);
    if(textAngle > 90 && textAngle < 270) {
      ctx.textAlign = 'end';
    }
    ctx.fillText(data[i].value * 100 + '%', x1, y1);
    angle0 += angle;
  }
})();