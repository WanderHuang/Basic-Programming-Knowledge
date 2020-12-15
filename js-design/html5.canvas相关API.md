## 概述

1. `canvas`让我们用一点简单的`js`上下文`API`就可以创建出图表和动画。
2. 最早由`Apple`引入`Webkit`用于`Mac OS X`的仪表盘。

## 基本用法


### xml

1. 只有`width`和`height`属性，没有传值时默认为`width=300;height=150`。
2. 可以使用`css`来定义大小。
3. 可以选替换的元素
4. 不能自封闭 🙅`<canvas />`

```html
<canvas id="canvas" width="200" height="200">
  {子元素是可选内容，当浏览器不支持canvas标签时展示}
  您的浏览器不支持该图片，建议您升级浏览器呢！😊
</canvas>

```

### 渲染上下文

```javascript
let canvas = document.querySelector('#canvas');
// 由于存在可替换的内容，因此在不支持canvas的浏览器上,canvas.getContext方法不存在
let ctx = canvas.getContext('2d');

// 最好判断一下

let ctx = canvas.getContext ? canvas.getContext('2d') : alert('不支持canvas，无法绘制')

// 或者

```

## 绘制

### 栅格grid

`+`所在位置为图像原点

```
-------------> x
|
| (x,y)
|   +--
|   | |
|   ---
V

y
```

### 绘制矩形

```javascript

// 填充矩形
ctx.fillRect(x, y, width, height)

// 绘制矩形边框
ctx.strokeRect(x, y, width, height)

// 清除矩形区域
ctx.clear(x, y, width, height)
```

### 绘制路径

创建一条路径，就是创建一系列的点，路径是一定是闭合的。

步骤：

1. 创建路径起始点
2. 绘制
3. 路径封闭
4. 边框|填充 路径区域

```javascript

// 新建路径
ctx.beginPath()

// 画笔定位到(x, y)
ctx.moveTo(x, y)

// 绘制线条到(x, y)
ctx.lineTo(x, y)

// 绘制弧线
ctx.arc(x, y, radius, startAngle, endAngle, anticlockwise)

// 绘制弧线
ctx.arc(x1, y1, x2, y2, radius)

// 二次贝塞尔曲线
ctx.quadraticCurveTo(cp1x, cp1y, x, y)

// 三次贝塞尔曲线
ctx.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, x, y)

// 矩形路径 默认moveTo(0, 0)
ctx.rect(x, y, width, height)

// 闭合路径
ctx.closePath()

// 绘制路径轮廓
ctx.stroke()

// 填充路径内区域
ctx.fill()
```

###  新的API

较新的`Path2D`接口支持快速生成路径。它包含所有的路径方法。

```javascript
new Path2D() // 空对象
new Path2D(path) // 克隆对象
new Path2D(d) // 从SVG建立Path对象

function draw() {
  var canvas = document.getElementById('canvas');
  if (canvas.getContext){
    var ctx = canvas.getContext('2d');

    var rectangle = new Path2D();
    rectangle.rect(10, 10, 50, 50);

    var circle = new Path2D();
    circle.moveTo(125, 35);
    circle.arc(100, 35, 25, 0, 2 * Math.PI);

    ctx.stroke(rectangle);
    ctx.fill(circle);
  }
}
```

## 样式和颜色

```javascript

// 填充颜色
ctx.fillStyle = color

// 轮廓颜色
ctx.strokeStyle = color

// 半透明

ctx.globalAlpha = number

// 设置线条宽度。
ctx.lineWidth = value

// 设置线条末端样式。
ctx.lineCap = type // [butt] round square

// 设定线条与线条间接合处的样式。
ctx.lineJoin = type // round bevel [miter]

// 限制当两条线相交时交接处最大长度；所谓交接处长度（斜接长度）是指线条交接处内角顶点到外角顶点的长度。
ctx.miterLimit = value

// 返回一个包含当前虚线样式，长度为非负偶数的数组。
ctx.getLineDash()

// 设置当前虚线样式。
ctx.setLineDash(segments)

// 设置虚线样式的起始偏移量。
ctx.lineDashOffset = value

// ########## 渐变 ##########

// 设置线性渐变
let linearGradient = ctx.createLinearGradient(x1, y1, x2, y2)

// 设置圆锥渐变
let radialGradient = ctx.createRadialGradient(x1, y1, r1, x2, y2, r2)

// 设置颜色值 position = [0, 1]
// 可重复使用，设置多个渐变点
gradient.addColorStop(position, color)

// ########## 循环样式 - 模式匹配 ##########
// 和image的repeat方式一样
let img = new Image();
img.src = 'someimage.png';
let ptrn = ctx.createPattern(img, 'repeat');

// ########## 阴影 ##########

// shadowOffsetX 和 shadowOffsetY 用来设定阴影在 X 和 Y 轴的延伸距离，它们是不受变换矩阵所影响的。负值表示阴影会往上或左延伸，正值则表示会往下或右延伸，它们默认都为 0。
ctx.shadowOffsetX = float

// shadowOffsetX 和 shadowOffsetY 用来设定阴影在 X 和 Y 轴的延伸距离，它们是不受变换矩阵所影响的。负值表示阴影会往上或左延伸，正值则表示会往下或右延伸，它们默认都为 0。
ctx.shadowOffsetY = float

// shadowBlur 用于设定阴影的模糊程度，其数值并不跟像素数量挂钩，也不受变换矩阵的影响，默认为 0。
ctx.shadowBlur = float

// shadowColor 是标准的 CSS 颜色值，用于设定阴影颜色效果，默认是全透明的黑色。
ctx.shadowColor = color

// 绘制决定在图形内还是在图形外
ctx.fill('evenodd') // evenodd图形夹合区域 [nonzero]
```

## 文本

```javascript

// 在指定的(x,y)位置填充指定的文本，绘制的最大宽度是可选的. 实心
ctx.fillText(text, x, y [, maxWidth])

// 在指定的(x,y)位置绘制文本边框，绘制的最大宽度是可选的. 空心
ctx.strokeText(text, x, y [, maxWidth])

// 设置字体
ctx.font = FontFamily

// 对齐选项
ctx.textAlign = value // [start] end left right center

// 基线对齐选项
ctx.textBaseline = value // top hanging middle [alphabetic] ideographic bottom

// 文本方向
ctx.direction = value // ltr rtl [inherit]

// 预测文本宽度
ctx.measureText('String').width

```

## 使用图片

1. 获得一个`HTMLImageElement`的对象或者另外一个`canvas`作为源，或者通过提供URL来使用图片
2. `drawImage()`绘制图片

图像来源

1. `HTMLImageElement`: `Image()`函数构造或者`<img/>`元素
2. `HTMLVideoElement`: `<video></video>`元素，获取视频的帧作为图像
3. `HTMLCanvasElement`: `<canvas></canvas>`元素
4. `ImageBitmap`: 位图，任意以上的类型都可以生成位图，绘制时高性能、低延迟

### 页面图像

可以使用一下方法获取页面图像作为`canvas`的图像来源

1. document.images
2. `document.getElementsByTagName()`|`document.getElementById()`等

### 跨域图像

需要`HTMLImageElement`上使用了`crossOrigin`属性，并且服务端允许。

否则可能会污染画布，且画布不被认为是安全的。从`canvas`上调用以下方法时就会报错(安全性问题)

1. `ctx.getImageData()`
2. `canvas.toBlob()`
3. `canvas.toDataURL()`


### 绘制

```javascript

// img类型
// HTMLOrSVGImageElement | HTMLVideoElement | HTMLCanvasElement | ImageBitmap | OffscreenCanvas
ctx.drawImage(img, x, y)

// 指定宽高：缩放
ctx.drawImage(image, x, y, width, height)

// 制定控制参数，对图片进行切片
ctx.drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight)

// eg

let img = new Image()
img.onload =  () => ctx.drawImage(img, 0, 0);
img.src = 'xxx'

ctx.drawImage(document.getElementById('imgid'), 0, 0)

```

## 形变 transformations

### 保存和恢复

快照中的状态

1. 当前应用的变形（即移动translate，旋转和缩放，见下）
2. 以及下面这些属性：strokeStyle, fillStyle, globalAlpha, lineWidth, lineCap, lineJoin, miterLimit, lineDashOffset, shadowOffsetX, shadowOffsetY, shadowBlur, shadowColor, globalCompositeOperation, font, textAlign, textBaseline, direction, imageSmoothingEnabled
3. 当前的裁切路径（clipping path），会在下一节介绍

```javascript

// 保存画布状态 压栈
ctx.save()

// 恢复画布状态(样式、形变恢复) 出栈
ctx.restore()
```

### 移动 translate

```javascript
// 移动canvas原点偏移量
ctx.translate(x, y)

```

### 旋转 rotate

```javascript
// 以原点为中心旋转画布
ctx.rotate(angle)

```

### 缩放 scale

```javascript

// 缩放图形像素数目
ctx.scale(x, y)

```

### 形变 transforms

```javascript
// 水平、竖直倾斜、水平倾斜、竖直、水平移动、竖直移动
ctx.transform(a, b, c, d, e, f)

// 当前形变矩阵重置为单位矩阵然后调用transform
ctx.setTransform(a, b, c, d, e, f)

// 重置形变矩阵为单位矩阵
ctx.resetTransform() // 等于ctx.setTransform(1, 0, 0, 1, 0, 0)
// 形成矩阵
// a c e
// b d f
// 0 0 1

```

### 组合 composit

```javascript
ctx.globalCompositeOperation = type // source-in source-out source-atop destination-over destination-in destination-out destination-atop lighter copy xor multiply screen overlay darken lighten color-dodge color-burn hard-light soft-light difference exclusion hue saturation color luminosity
```

### 裁切 clip
隐藏不需要的部分。
```javascript
ctx.clip()
```

## 动画

```javascript

// 动起来
setTimeout

setInterval

requestAnimationFrame

// 帧
clearRect

// 长尾动画需要用半透明的fillRect函数取代clearRect


```


## 像素操作API

`ImageData`

1. `width`
2. `height`
3. `data`: Uint8ClampedArray

```javascript
// 创建
ctx.createImageData(width, height)
// 获取

ctx.getImageData(left, top, width, height)

// 写入
ctx.putImageData(myImageData, dx, dy)

// 缩放使用drawImage的API
ctx.drawImage(...args)

// 保存图片：创建PNG
canvas.toDataURL('image/png')

// 保存图片：JPG
canvas.toDataURL('image/jpeg', quality)

// 创建Blob
canvas.toBlob(callback, type, encoderOptions)
```


## 性能优化

1. 在离屏canvas上预渲染相似的图形或重复的对象
2. 避免浮点数的坐标点，用整数取而代之
3. 不要在用drawImage时缩放图像
4. 使用多层画布去画一个复杂的场景
5. 用CSS设置大的背景图
6. 用CSS transforms特性缩放画布 CSS transform使用GPU
7. 关闭透明度
8. 将画布的函数调用集合到一起（例如，画一条折线，而不要画多条分开的直线）
9. 避免不必要的画布状态改变
10. 渲染画布中的不同点，而非整个新状态
11. 尽可能避免 shadowBlur特性
12. 尽可能避免text rendering
13. 尝试不同的方法来清除画布(clearRect() vs. fillRect() vs. 调整canvas大小)
14.  有动画，请使用window.requestAnimationFrame() 而非window.setInterval()
15. 请谨慎使用大型物理库
