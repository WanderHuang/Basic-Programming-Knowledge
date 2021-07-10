# 浏览器事件机制

### 阻止默认行为

1. 表单提交
2. a 标签跳转

使用`e.preventDefault()`阻止默认行为。

### 冒泡和捕获

```

- div
   - button <- click

```

一个事件发生在有父元素的元素上时，现代浏览器运行两种不同的阶段。

1. 捕获阶段

- 检查最外层(html)，并运行 `click` 事件
- 元素的下一个祖先(div)，依次执行
- `button` 执行

2. 冒泡阶段和捕获阶段相反，当前元素先执行，然后往上到 html

**现代浏览器默认所有的事件处理程序都在冒泡阶段进行注册。**

1. 使用`e.stopPropagation()`停止冒泡
2. 想在捕获阶段注册一个事件，则使用`addEventListener()`,第三个字段设置为`true`
3. 可以利用事件委托，用父节点代理子节点的事件

### 创建自定义的事件

```js
// 注册一个自定义事件
dom.addEventListener(
  "customer",
  (e) => console.log("event customer", e),
  false
); // 第三个字段设置为true，则变为捕获阶段注册和执行事件，false为冒泡阶段执行

// 创建一个自定义事件，并通过dispatchEvent进行触发
const e = new Event("customer", { bubbles: true, cancelable: false });
dom.dispatchEvent(e);
```

### 事件循环

1. 回调函数并不是立即执行，时间代表了任务被添加进队列的最小延迟

```js
const s = new Date().getSeconds();

// 宏任务事件队列执行 setTimeout(fn, time);中的fn被添加进队列末尾
setTimeout(() => {
  console.log(new Date().getSeconds() - s);
}, 500);

// 宏任务事件队列
// 事实上对事件队列系统进行了阻塞，10s后终止阻塞
while (true) {
  if (new Date().getSeconds() - s >= 10) {
    console.log("break");
    break;
  }
}
```

同理，time=0 也不代表立即执行，而是当前任务队列内的函数执行完毕后，“立即”添加进事件队列。

```js
// 1 2 3 4 5
(() => {
  console.log(1);
  setTimeout(() => console.log(4));
  console.log(2);
  setTimeout(() => console.log(5), 0);
  console.log(3)

}())

```

2. 不同的 `js` 运行时只能通过 `postMessage` 来进行通行，`onmessage` 的时候往队列添加消息

3. 永不阻塞。事件队列不停地取任务执行，也不停地添加新的任务。

4. 在本次宏任务结束之后，下一个宏任务调用之前，执行当前的微任务队列

5. 一个任务执行完毕后，才会从队列中取出下一个任务。

宏任务包括

- 脚本本身
- `setTimeout` 可以在 time 延迟后添加一个宏任务
- `setInterval` 可以在 time 延迟后添加一个宏任务，循环执行
- `postMessage` 和 onmessage 创建处理消息的宏任务
- `MessageChannel` 创建通道宏任务
- `setImmediate`（nodejs）
- `new Promise` 的参数 fn 被添加为一个宏任务

微任务包括

- `Promise.then` 添加一个微任务，一个 `p.then` 被调用就产生一个微任务(等同于一次 `resolve` 产生一个微任务)
- `MutationObserver`
- `process.nextTick(nodejs)`

```js
// 第一个宏任务 A
function exec() {
  let p = new Promise(
    /* 第二个宏任务 B */ (resolve) => {
      setTimeout(
        /* 第三个宏任务 C */ () => {
          resolve();
          console.log(1);
        }
      );
      // 产生一个微任务 a
      Promise.resolve().then(() => console.log(0));
    }
  );
  setTimeout(/* 第四个宏任务 D */ () => console.log(3));
  p.then(/* 产生一个微任务 b */ () => console.log(2));
}

exec();
// 忽略console.log => 它本身是一个宏任务，但不影响我们分析，跳过
// 第一步 A B a D => A执行过程中有一个微任务，则执行B之前先执行a 输出0
// 第二步 B b     => B执行过程中有一个微任务，则执行D之前先执行b，B本身输出1，微任务b输出2
// 第三步 D       => D执行过程中没有添加新的任务，输出3
```
