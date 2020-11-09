# 前端优化方案
针对每个问题的性能分析方案

## 卡顿、不流畅
页面运行时用户觉得卡顿、不流畅，原因有很多，根本原因
1. javascript运行时间太长阻塞ui渲染
2. UI重排重绘太多

排查方法
1. 审查电脑配置。CPU -> 决定脚本运行速度。Memory -> 决定运行时堆内存(对象、数组、游离字符串)分配
2. 开发者工具需要关注
   2.1 Memory 内存占用。一般的web应用100MB就已经很高了，500MB算是顶天
   2.2 Performance 性能考察。可以定时检测页面性能，顶部有选项可以模拟降低CPU执行效率或者网络状况
   2.3 Application 应用。关注localStorage、sessionStoage、cookie等数据存量(安全性同理)
   2.4 Network 网络。关注每个请求的等待时间和响应时间，数据量大小，Gzip等等
3. 其中最重要的是Performance。里面有很多指标可以考察
   3.1 FP first paint 首次渲染
   3.2 FCP first contentful paint 内容开始渲染
   3.3 LCP largest contentful paint 最大内容渲染量
   3.4 DCL DOMContent Loaded Event dom数据加载完成事件
   3.5 Network 每个时段发生了什么网络事件
   3.6 Frames 页面帧数
   3.7 Interactions 交互、动画
   3.8 Main 主线程事件
   3.9 GPU 显卡效率
   3.10 JS Heap 堆内存
   3.11 Documents 文档
   3.12 Nodes 节点
   3.13 Listeners 监听器
   3.14 GPU Memory 显寸
   3.15 Summary 总结。内有脚本时间，渲染时间，绘制时间，空闲时间等
   3.16 Bottem-up 可以看到脚本的各个方法执行时间(调用栈)
   3.17 Call Tree 函数调用链
   3.18 Event Log 事件
4. 除了上述的方式，我们也可以自定义对一个方法、脚本的检测

```javascript
// 堆内存限制
performance.memory.jsHeapSizeLimit
// 总占用堆内存
performance.memory.totalJSHeapSize
// 存活堆内存
performance.memory.usedJSHeapSize
// 从系统运行到当前的时间
performance.now()
// 各个数据的时间线, 文档加载完成、事件完成、网络请求耗时等等，都可以计算
performance.timing

// 可以前后加performance.now()，计算方法执行时间 单位为ms
let start = performance.now();
run()
console.log(performance.now() - start);
```

5. 从业务上思考有一些影响运行速度的因素
   5.1 数据量很大。其实大量的数据，如果是公式化的处理，比如图片的数据处理(Buffer)，因为浏览器本身有优化，不会有太大的耗时。但是一般我们的业务代码都是对象数组，就可能存在大量耗时操作(对象读写耗时)
   5.2 循环嵌套。这就要用到算法分析的思路了，n和n^2是不一样的效率，应该尽量减少循环
   5.3 递归嵌套。递归会有更多的函数栈开辟、保存和恢复的操作，本身是比循环要慢一些，可以尝试优化为循环。
   5.4 同步操作。一些不相关的操作，如果不是非常必要，可以拆分为异步执行的，充分利用setTimeout和Promise机制
   5.5 渲染阻塞。DOM操作如果大量在对元素进行增减、样式变更，会触发大量的重排重绘，造成页面卡顿。
   5.6 网络请求。网络请求太多也会影响加载，尽量把数据放在页面，并利用ajax发起异步请求，减少请求，对请求做缓存、gzip等等方式可以减少请求带来的影响
   5.7 重复操作。一般这是由不当操作造成的，比如react频繁重绘
6. 除了上述的方案，我们还可以记录用户客户端的信息，这样避免了每次线上问题都要现场定位。
   6.1 可以用上面我们提到的performance来上报。
   6.2 定义脚本，全局捕获错误、内存占用量，定时上报
   6.3 console打印日志，让客户导出发送给我们
   6.4 日志存储到indexDB，长久保存，方便排查
   6.5 制作浏览器插件，帮助分析页面状态，上报服务器(插件是另外的线程)

解决方案
上面已经提及了的问题发声方式，基本都有对应的解决方案。另外还有一些方案可以采用
1. lighthouse 谷歌出的页面性能分析工具
2. react性能分析
3. DOM内容优化
4. 多级缓存方案。可以利用的缓存有：LRU内存内缓存方案、localStorag、sessionStorage、indexDB、nginx cache等等
5. GPU加速。方案有利用transform对单个元素进行动画运算、canvas利用等
