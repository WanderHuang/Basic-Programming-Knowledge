// 判断两个矩形是否相交
// 核心：顶点在一个里面，边相交
//
//
function Rect(x, y, width, height) {
  this.x = x;
  this.y = y;
  this.width = width;
  this.height = height;

  this.topLeft = [x, y];
  this.topRight = [x + width, y];
  this.bottomLeft = [y + height, x];
  this.bottomRight = [x + width, y + height];


  this.xRange = [x, x + width];
  this.yRange = [y, y + height];


  // o-----> x
  // |
  // |
  // |
  // y
}


function isIntersected(b1, b2) {
  


}
