class Line {
  constructor(props){
    this.x = 0;
    this.y = 0;
    this.startX = 0;
    this.startY = 0;
    this.endX = 400;
    this.endY = 0;
    this.rotation = 0;
    this.strokeStyle = 'rgb(37, 127, 221)';
    this.lineWidth = 2;
    Object.assign(this, props);
    return this;
  }
  render(ctx){
    const {x, y, startX, startY, endX, endY, strokeStyle, lineWidth, rotation} = this;
    ctx.save();
    ctx.lineWidth = lineWidth;
    ctx.strokeStyle = strokeStyle;
    ctx.translate(x, y);
    ctx.rotate(rotation);
    ctx.beginPath();
    ctx.lineTo(startX, startY);
    ctx.lineTo(endX, endY);
    ctx.stroke();
    ctx.restore();
  }
}