/* globals addMisfortune */

$(document).ready(function () {

  var $wheelElement = $('#wheel-of-mystfortune');
  
  var width = $wheelElement.width();
  var height = width;
  
  $wheelElement.prepend('<canvas width="' + width + '" height="' + height + '"></canvas>');
  
  var colors = [null, "#74A949", "#B6DDD3", "#5E8AB9", "#E37536",
                "#F8D43A", "#56B9C5", "#99C987", "#FFF5D5",
                "#C43331", "#B6DDD3", "#62BA9D", "#E37536",
                "#56B9C5", "#1DB2D4", "#F8D43A", "#C43331"];

  var startAngle = 0;
  var arc = Math.PI / 8;
  var spinTimeout = null;

  var spinAngleStart;

  var spinTime = 0;
  var spinTimeTotal = 0;

  var ctx;

  function draw() {
    drawRouletteWheel();
  }

  function drawRouletteWheel() {
    var canvas = $wheelElement.find('canvas')[0];
    if (canvas.getContext) {
      var outsideRadius = width * 0.4;
      var textRadius = width * 0.32;
      var insideRadius = width / 8;
    
      ctx = canvas.getContext("2d");
      ctx.clearRect(0,0,width,height);
    
      ctx.strokeStyle = "black";
      ctx.lineWidth = 2;
    
      ctx.font = '12px sans-serif';
      
      ctx.imageSmoothingEnabled
    
      for(var i = 1; i <= 16; i++) {
        var angle = startAngle + i * arc;
        ctx.fillStyle = colors[i];
      
        ctx.beginPath();
        ctx.arc(width / 2, height / 2, outsideRadius, angle, angle + arc, false);
        ctx.arc(width / 2, height / 2, insideRadius, angle + arc, angle, true);
        ctx.stroke();
        ctx.fill();
      
        ctx.save();
        ctx.fillStyle = "black";
        ctx.translate(width / 2 + Math.cos(angle + arc / 2) * textRadius, height / 2 + Math.sin(angle + arc / 2) * textRadius);
        ctx.rotate(angle + arc / 2 + Math.PI / 2);
        var text = i;
        ctx.fillText(text, -ctx.measureText(text).width / 2, 0);
        ctx.restore();
      } 
    
      //Arrow
      ctx.fillStyle = "black";
      ctx.beginPath();
      ctx.moveTo(width / 2 - 4, height / 2 - (outsideRadius + 5));
      ctx.lineTo(width / 2 + 4, height / 2 - (outsideRadius + 5));
      ctx.lineTo(width / 2 + 4, height / 2 - (outsideRadius - 5));
      ctx.lineTo(width / 2 + 9, height / 2 - (outsideRadius - 5));
      ctx.lineTo(width / 2 + 0, height / 2 - (outsideRadius - 13));
      ctx.lineTo(width / 2 - 9, height / 2 - (outsideRadius - 5));
      ctx.lineTo(width / 2 - 4, height / 2 - (outsideRadius - 5));
      ctx.lineTo(width / 2 - 4, height / 2 - (outsideRadius + 5));
      ctx.fill();
    }
  }

  function spin() {
    spinAngleStart = Math.random() * 10 + 10;
    spinTime = 0;
    spinTimeTotal = Math.random() * 3 + 4 * 1000;
    rotateWheel();
  }

  function rotateWheel() {
    spinTime += Math.random() * 60;
    if(spinTime >= spinTimeTotal) {
      stopRotateWheel();
      return;
    }
    var spinAngle = spinAngleStart - easeOut(spinTime, 0, spinAngleStart, spinTimeTotal);
    startAngle += (spinAngle * Math.PI / 180);
    drawRouletteWheel();
    spinTimeout = setTimeout(function () {
      rotateWheel();
    }, 30);
  }

  function stopRotateWheel() {
    clearTimeout(spinTimeout);
    var degrees = startAngle * 180 / Math.PI + 90;
    var arcd = arc * 180 / Math.PI;
    var misfortune = Math.floor((360 - degrees % 360) / arcd);
    ctx.save();
    ctx.font = 'bold 30px sans-serif';
    addMisfortune(misfortune);
    ctx.fillText(misfortune, width / 2 - ctx.measureText(misfortune).width / 2, width / 2 + 10);
    ctx.restore();
  }

  function easeOut(t, b, c, d) {
    var ts = (t/=d)*t;
    var tc = ts*t;
    return b+c*(tc + -3*ts + 3*t);
  }

  draw();
  
  $('#spin-button').on('click', function () {
    spin();
  });
  
});