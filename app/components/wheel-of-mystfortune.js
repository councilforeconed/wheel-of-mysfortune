export default Ember.Component.extend({
  
  tagName: 'div',
  
  startAngle: 0,
  arc: Math.PI / 8,
  spinTimeout: null,
  
  spinArcStart: 10,
  spinTime: 0,
  spinTimeTotal: 0,
  
  colors: ["#74A949", "#B6DDD3", "#5E8AB9", "#E37536",
            "#F8D43A", "#56B9C5", "#99C987", "#FFF5D5",
            "#C43331", "#B6DDD3", "#62BA9D", "#E37536",
            "#56B9C5", "#1DB2D4", "#F8D43A", "#C43331"],
  
  didInsertElement: function () {
    if (!this.get('canvas')) this.set('canvas', this.$()[0]);
    this.drawRouletteWheel();
  },
  
  drawRouletteWheel: function () {
    var canvas = this.get('canvas');
    
    if (canvas.getContext) {
      
      var outsideRadius = 200;
      var textRadius = 160;
      var insideRadius = 125;
      
      var ctx = canvas.getContext("2d");
      ctx.clearRect(0,0,500,500);
      
      ctx.strokeStyle = "black";
      ctx.lineWidth = 2;

      ctx.font = '12px sans-serif';
      
      for(var i = 0; i < 16; i++) {
        var angle = this.get('startAngle') + i * this.get('arc');
        ctx.fillStyle = this.get('colors')[i];

        ctx.beginPath();
        ctx.arc(250, 250, outsideRadius, angle, angle + this.get('arc'), false);
        ctx.arc(250, 250, insideRadius, angle + this.get('arc'), angle, true);
        ctx.stroke();
        ctx.fill();

        ctx.save();
        ctx.shadowOffsetX = -1;
        ctx.shadowOffsetY = -1;
        ctx.shadowBlur    = 0;
        ctx.shadowColor   = "rgb(220,220,220)";
        ctx.fillStyle = "black";
        ctx.translate(250 + Math.cos(angle + this.get('arc') / 2) * textRadius, 250 + Math.sin(angle + this.get('arc') / 2) * textRadius);
        ctx.rotate(angle + this.get('arc') / 2 + Math.PI / 2);
        var text = i;
        ctx.fillText(text, -ctx.measureText(text).width / 2, 0);
        ctx.restore();
      } 

      //Arrow
      ctx.fillStyle = "black";
      ctx.beginPath();
      ctx.moveTo(250 - 4, 250 - (outsideRadius + 5));
      ctx.lineTo(250 + 4, 250 - (outsideRadius + 5));
      ctx.lineTo(250 + 4, 250 - (outsideRadius - 5));
      ctx.lineTo(250 + 9, 250 - (outsideRadius - 5));
      ctx.lineTo(250 + 0, 250 - (outsideRadius - 13));
      ctx.lineTo(250 - 9, 250 - (outsideRadius - 5));
      ctx.lineTo(250 - 4, 250 - (outsideRadius - 5));
      ctx.lineTo(250 - 4, 250 - (outsideRadius + 5));
      ctx.fill();
      
      console.log('canvas');
    }
  }
  
  
});