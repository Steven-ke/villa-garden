// 粒子类
class Particle {
  constructor(props){
    this.x = 0;
    this.y = 0;
    this.r = 40;
    this.fillStyle = 'rgb(42, 158, 215)';
    this.strokeStyle = '';
    this.vx = 0;
    this.vy = 0;
    this.ax = 0;
    this.ay = 0;
    this.m = 1;
    Object.assign(this, props);
    return this;
  }
  render(ctx){
    const {x, y, r, fillStyle, strokeStyle} = this;
    ctx.save();
    ctx.translate(x, y);
    ctx.fillStyle = fillStyle;
    ctx.strokeStyle = strokeStyle;
    ctx.beginPath();
    ctx.arc(0, 0, r, 0, 2*Math.PI);
    ctx.fill();
    if(strokeStyle) ctx.stroke();
    ctx.restore();
  }
}

