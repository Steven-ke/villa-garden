// 返回范围随机数
function rp(arr, int){  // rp([10, 1], true) 
  const max = Math.max(...arr);
  const min = Math.min(...arr);
  const ret = Math.random() * (max - min) + min;
  return int ? Math.round(ret) : ret;
}

// 处理边界反弹
function checkBounce(p, W, H, bounce = -1){
  if(p.x - p.r < 0){
    p.x = p.r;
    p.vx *= bounce;
  }else if(p.x + p.r > W){
    p.x = W - p.r;
    p.vx *= bounce;
  }
  
  if(p.y - p.r < 0){
    p.y = p.r;
    p.vy *= bounce;
  }else if(p.y + p.r > H){
    p.y = H - p.r;
    p.vy *= bounce;
  }
}

// 边界循环
function checkLoop(p, W, H){
  if(p.x + p.r < 0){
    p.x = W + p.r;
  }else if(p.x - p.r > W){
    p.x = -p.r;
  }
  
  if(p.y + p.r < 0){
    p.y = H + p.r;
  }else if(p.y - p.r > H){
    p.y = -p.r;
  }
}

function checkParticleHit(p1, p2){
  let dx = p2.x - p1.x;
  let dy = p2.y - p1.y;
  let dist = Math.sqrt(dx**2 + dy**2);
  if(dist < p1.r + p2.r){
    let angle = Math.atan2(dy, dx);
    let sin = Math.sin(angle);
    let cos = Math.cos(angle);
    
    // 以p1为参照物，设定p1的中心点为旋转基点
    let x1 = 0;
    let y1 = 0;
    let x2 = dx * cos + dy * sin;
    let y2 = dy * cos - dx * sin;
    
    // 旋转p1和p2的速度
    let vx1 = p1.vx * cos + p1.vy * sin;
    let vy1 = p1.vy * cos - p1.vx * sin;
    let vx2 = p2.vx * cos + p2.vy * sin;
    let vy2 = p2.vy * cos - p2.vx * sin;
    
    // 求出p1和p2碰撞之后的速度
    let vx1Final = ((p1.m - p2.m) * vx1 + 2 * p2.m * vx2) / (p1.m + p2.m);
    let vx2Final = ((p2.m - p1.m) * vx2 + 2 * p1.m * vx1) / (p1.m + p2.m);
    
    // 处理两个小球碰撞之后，简单处理为将它们进行归位
    let lep = (p1.r + p2.r) - Math.abs(x2 - x1);
    
    if((vx1 > 0 && vx1Final < 0 && vx2 < 0 && vx2Final > 0)|| (vx1 < 0 && vx1Final > 0 && vx2 > 0 && vx2Final < 0)){
      x1 = x1 + (vx1Final < 0 ? -lep/2 : lep/2);
      x2 = x2 + (vx2Final < 0 ? -lep/2 : lep/2);
    }else if(vx1 > 0 && vx1Final > 0 && vx2 < 0 && vx2Final > 0){
      x2 += lep;
    }else if(vx1 > 0 && vx1Final < 0 && vx2 < 0 && vx2Final < 0){
      x1 -= lep;
    }
    
    p2.x = p1.x + (x2 * cos - y2 * sin);
    p2.y = p1.y + (y2 * cos + x2 * sin);
    p1.x = p1.x + (x1 * cos - y1 * sin);
    p1.y = p1.y + (y1 * cos + x1 * sin);
    
    p1.vx = vx1Final * cos - vy1 * sin;
    p1.vy = vy1 * cos + vx1Final * sin;
    p2.vx = vx2Final * cos - vy2 * sin;
    p2.vy = vy2 * cos + vx2Final * sin;
  }
}