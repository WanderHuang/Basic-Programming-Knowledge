## ES6模块管理与cjs对比

1. 语法差异

```javascript
// cjs
require()
module.exports = a

// es6
export default x;
import x from 'x';

```

2. `ES6`的模块标准是支持`同步加载(server)|异步加载(browser)`两种的，但经过`webpack+babel`转为`ES5`之后都是同步的。`CommonJS`的`require`语法是同步的，只能在服务端用。

`CommonJS`同步意味引入的脚本 执行完毕后才能执行后面的内容。而`ES6`有一个独立的静态解析阶段，依赖关系的分析在编译期就完成了，最底层的模块第一个执行。

3. `CommonJS`为运行时加载；`ES6`为编译时输出接口，分为静态引用和动态引用。

但兼容性不好，一般现在还是用`webpack+babel`转为`ES5`。
```html
<!-- 默认为defer 支持async CORS -->
<script type="module">
  import { mod } from 'some/mod.mjs';
  mod()
</script>
<!-- 降级处理 -->
<script nomodule src="some/fallback.js"></script>
```

```javascript
// in mod.mjs
// mime application/javascript
export function mod () {
  console.log(1)
}
```

```javascript

// 动态import
// wasm模块就可以这样加载
import('./mod').then(module => console.log(module))

```

4. `CommonJS`输出值拷贝，`ES6`输出值引用。

5. `package.json`设置

```json
{
  // ES6 
  "type": "module",
  // 入口文件没有配置type表示CommonJS，type=module表示ES6
  "main": "./index.js",
  // 优先级比main字段高，require表示CommonJS引入，default表示ES6模块
  "exports": {
    "require": "./main.cjs",
    "default": "./main.js"
  }
}
```

6. 循环引用。`CommonJS`没法运行(边解释边拿值)，`ES6`可以执行(得益于预编译)