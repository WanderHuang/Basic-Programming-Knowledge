## 基础变更

- 语义化：恰当地描述你的内容
- 连通性：服务器通信新方式
- 离线存储：本地存储方式
- 多媒体：video|audio
- 绘图：2D|3D
- 性能：更优化的性能
- 设备：输入输出设备的信号处理
- 样式：更多样式支持

1. 文件头

声明`doctype`(不区分大小写)，表明页面使用`html5`的标准

```html
<!DOCTYPE html>
```

2. 元数据

用简洁的语法声明字符集

```html
<meta charset="UTF-8" />
```

## 语义

- 新定义的元素用于支持网页的大纲算法，以前用`div+class`来表明的语义可以通过单一标签元素来实现。

- 对于未知元素，浏览器会初始化样式为`display:inline`，因此对于不支持`html5`元素的浏览器需要增加`display:block`让元素成为块级元素

- 禁用脚本的网站，需要使用`<nosccript></nosccript>`标签做降级处理

- 语义元素`header|section|footer|nav|aside|mark|figure|figcaption|data|time|output|progress|meter|main`

```html
<!-- 包含网站相关信息 -->
<header>
  <p>Productive company</p>
</header>
<!-- 章节 -->
<section>
  <!-- 章节标题 -->
  <h1>Forest elephants</h1>

  <!-- 子章节 -->
  <section>
    <h1>Introduction</h1>
    <p>In this section, we discuss the lesser known forest elephants.</p>
  </section>

  <!-- 不属于大纲的特殊章节 -->
  <aside>
    <p>
      advertising block
      <!-- 导航 -->
      <nav>
        <a href="/xxx">redirect</a>
      </nav>
    </p>
  </aside>
</section>
<!-- 包含网站相关信息 -->
<footer>
  <p>(c) 2010 The Example company</p>
</footer>

```

## 音频视频

示例：引入`video`元素

```html
<video src="http://v2v.cc/~j/theora_testsuite/320x240.ogg" controls>
  你的浏览器不支持 <code>video</code> 标签.
</video>
```

示例：引入`audio`元素

```html
<audio src="audio.ogg" controls autoplay loop>你的浏览器不支持audio标签</audio>
```

### 属性列表

- `controls`：为网页音频先试试标准的`HTML5`控制器
- `autoplay`：音频自动播放
- `loop`： 自动重复播放
- `preload`：缓冲大文件.`none|auto|metadata`不缓冲、缓冲音频、缓冲元数据

可以指定`<source>`标签来给出多个文件。

```html
<video controls>
  <source src="foo.ogg" type="video/ogg; codecs=dirac, speex" />
  <source src="foo.mp4" type="video/mp4" />
  Your browser does not support the <code>video</code> element.
</video>
```

按支持顺序，`ogg`如果支持，就播放`ogg`类型，否则播放`mp4`格式。
`<source>`的 type 内可以支持用`codecs`给出视频编解码器

支持降级到 Flash|其他播放器

```html
<video src="video.ogv" controls>
  <object data="flvplayer.swf" type="application/x-shockwave-flash">
    <param value="flvplayer.swf" name="movie" />
  </object>
</video>
```

### API

```html
<audio id="demo" src="audio.mp3"></audio>
<script>
  // audio
  let demo = document.getElementById('demo');
  demo.play(); // 播放声音
  demo.pause(); // 暂停声音
  demo.volume += 0.1; // 提高音量
  demo.removeAttribute('src'); // 停止下载 或者demo.src = ''
  // 媒体中查找 .seekable和.played都返回TimeRanges对象
  demo.seekable.start(); // 返回开始时间 (in seconds)
  demo.seekable.end(); // 返回结束时间 (in seconds)
  demo.currentTime = 122; // 设定在 122 seconds
  demo.played.end(); // 返回浏览器播放的秒数
</script>
```

## 表单

### 强制校验

1. `required`属性强制校验表单标签
2. `minlength|maxlength`字符长度
3. `min|max`数字范围
4. `type` 数字、邮件地址等类型
5. `pattern`设定正则校验

```html
<form>
  <label for="choose">Would you prefer a banana or cherry? (required)</label>
  <input id="choose" name="choose" required />
  <button>Submit</button>
</form>
```

对应伪类`pseudoclass`

```css
#choose:invalid {
}

#choose:required {
}
```

还存在一写 js 属性可以帮助我们设置`prompt`或者控制校验。待详细看。

### 元素

1. `<fieldset></fieldset>`包裹一些表单元素，`<legend></legend>`设置标题
2. `<datalist></datalist>`设置列表，可以关联到表单
3. `<label></label>`关联一个表单元素，支持点击`label`聚焦
4. `form.action|form.method|form.enctype`发送数据的地址、HTTP 方式、表单格式
5. `<output></output>`可以显示计算结果使用

```html
<form oninput="x.value=parseInt(a.value)+parseInt(b.value)">
  0 <input type="range" id="a" value="50" />100 +<input
    type="number"
    id="b"
    value="50"
  />
  =<output name="x" for="a b"></output>
</form>
```

### 样式

`css3`对应增加的伪类

- `:enabled`
- `:disabled`
- `:checked`
- `:indeterminate`
- `:default`
- `:valid`
- `:invalid`
- `:in-range`
- `:out-of-range`
- `:required`
- `:optional`
- `:read-only`
- `:read-write`

## iframe

`iframe`可以把一个浏览器上下文嵌套到当前`HTML`页面内

- 独立的会话历史记录 `History`
- 独立的`DOM`树
- 性能开销大

可用属性

- `allow` 指定特征策略
- `allowfullscreen` 为`true`时可以用`requestFullscreen()`激活全屏
- `height` 默认 150 像素
- `name` 名称
- `sandbox` 额外的限制条件
- `src` 遵循同源策略的页面 URL
- `width` 默认 300 像素

`iframe`可以使用`window.postMessage`进行通信

## 通信方式

1. 增加`websocket`方式: 基于 TCP 协议，全双工

```javascript
// 必须是http1.1
//   connection:  Upgrade
//   Upgrade: websocket
// 专用头
//   Sec-WebSocket-Extensions: xx,  yy,  cc
//   Sec-WebSocket-Key: key
//   Sec-WebSocket-Protocol: protocol
//   Sec-WebSocket-Version: protocol
// 响应头
//   Sec-WebSocket-Accept: hash
let ws = new WebSocket(url[, protocols]);

// 事件
ws.onopen
ws.onmessage
ws.onclose
ws.onerror

// 只读数据
ws.url
ws.protocol
ws.readyState
ws.extensions
ws.bufferedAmount

// 方法

ws.close()
ws.send(data)

```

2. 新增服务器发送事件 `EventSource` SSE：基于 http 协议，单向发送文本

```javascript
const evtSource = new EventSource('url', { withCredentials: true });

evtSource.onmessage = (e) => {
  console.log(e.data);
};

evtSource.onerror = (e) => {
  console.log(e);
};

evtSource.close();

// 服务端设置
res.set('Cache-Control', 'no-cache');
res.set('Content-Type', 'text/event-stream');

res.send('abc');
```

3. 增加`webRTC`技术。待解析，支持直播

## 存储

1. 应用级别存储：给`<html></html>`增加`manifest`特性。

需要设置缓存清单`cache manifest`。应用缓存，离线都可以使用。`PWA`技术的基础。
缓存清单可以是一个网络资源，`mime`类型为`text/cache-manifest`

2. DOM 存储规范(`Web Storage`挂载在`window`上)。

- `window.sessionStorage`
- `window.localStorage`

对应 API

```javascript
let store = sessionStorage; // localStorage;

store.setItem('key', 'value');
store.getItem('key');
```

这部分的值在`chorme dev tools`的`Application`中可以找到

3. `IndexedDB`技术

- 底层 API、Promise、支持大型数据或结构化数据存储
- 可以在`Worker`中使用

原生`API`较难使用，用`forge`（封装库）的较多

```javascript
// 我们先打开一个数据库
var DBOpenRequest = window.indexedDB.open('toDoList', 4);

// 当数据库打开出错/成功时，以下两个事件处理程序将分别对IDBDatabase对象进行下一步操作
DBOpenRequest.onerror = function (event) {
  note.innerHTML += '<li>Error loading database.</li>';
};

DBOpenRequest.onsuccess = function (event) {
  note.innerHTML += '<li>Database initialised.</li>';

  // 将打开数据库的结果存储在db变量中，该变量将在后面的代码中被频繁使用
  db = DBOpenRequest.result;

  // 运行displayData()方法，用IDB中已经存在的所有待办事项列表数据填充到任务列表中
  displayData();
};

// 当试图打开一个尚未被创建的数据库，或者试图连接一个数据库还没被创立的版本时，onupgradeneeded事件会被触发

DBOpenRequest.onupgradeneeded = function (event) {
  var db = event.target.result;

  db.onerror = function (event) {
    note.innerHTML += '<li>Error loading database.</li>';
  };

  // 使用IDBDatabase.createObjectStore方法，可创建一个对象存储区

  var objectStore = db.createObjectStore('toDoList', { keyPath: 'taskTitle' });

  // 定义objectStore将包含哪些数据项

  objectStore.createIndex('hours', 'hours', { unique: false });
  objectStore.createIndex('minutes', 'minutes', { unique: false });
  objectStore.createIndex('day', 'day', { unique: false });
  objectStore.createIndex('month', 'month', { unique: false });
  objectStore.createIndex('year', 'year', { unique: false });

  objectStore.createIndex('notified', 'notified', { unique: false });

  note.innerHTML += '<li>Object store created.</li>';
};

var objectStore = db.transaction('toDoList').objectStore('toDoList');
```

4. 增加`File`相关的API，可以读写文件

```javascript
// <input type="file" id="input" onchange="handleFiles(this.files)">
const inputElement = document.getElementById("input");
inputElement.addEventListener("change", handleFiles, false);
function handleFiles() {
  const fileList = this.files;
}

file.size // 文件大小bytes

// 流读取，可以读取为多种类型
// reader.readAsText => 文本
// reader.readAsArrayBuffer => buffer数组
// reader.readAsBinaryString => 二进制字符
let reader = new FileReader();

reader.onload = (dataUrl) => {} // 可以设置给img.src
reader.readAsDataURL(file);

// 对象URL
let objectURL = window.URL.createObjectURL(file); // 可以给img.src, img.onload后需要调用释放
window.URL.revokeObjectURL(objectURL) // 释放

// 文件上传
let form = new FormData(); // multipart/form-data;boundary=something
form.append('filename', file);

```

## 图像

这块都需要单独集成

- `canvas`
- `svg`
- `webgl`

## 其他

每个部分都需要**单独**文章

- `web worker`：模拟多线程编程
- `history`：控制浏览器访问历史，栈。
- `contentEditable`属性：支持元素修改
- `拖放`：拖拽支持
- `requestAnimationFrame`：在动画下帧插入执行
- `全屏`：支持全屏
- `在线离线检测`
- `摄像头API`
- `触控API`
- `地理位置获取`
- `设备方向检测`
- `css3相关样式`
