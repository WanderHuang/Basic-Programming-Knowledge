// ============================
// =========== 队列 ============
// ============================
// --enqueue---------------dequeue->
// --front-- [a, b, c, d] --rear--->
// 特性：先进先出
// 操作
// 1. enqueue 入队列
// 2. dequeue 出队列
// 3. front 读取头部元素
// 4. rear  读取尾部元素
// 5. length 读取队列长度
// 6. isEmpty  是否为空

/**
 * 队列
 * 1. 用首尾指针来获取活动队列长度
 * 2. 入队、出队不使用数组原生方法
 * 3. 构造函数变量隐藏
 * @param {*} size 初始化队列长度
 */
function Queue({ size = 10, name = 'Queue' }) {
  // 避免this.xx直接访问，所有的数据包裹到内部变量，不推荐用户访问
  this._queue_ = {
    size,
    name,
    front: 0,
    rear: 0,
    list: [],
  };
}

Queue.prototype = {
  /**
   * 判定是否为空
   */
  isEmpty: function () {
    return this._queue_.front === this._queue_.rear;
  },
  /**
   * 判定是否为满
   */
  isFull: function () {
    return this.length() === this.maxSize();
  },
  /**
   * 当前长度
   */
  length: function () {
    return this._queue_.front - this._queue_.rear;
  },
  /**
   * 最大值
   */
  maxSize: function () {
    return this._queue_.size;
  },
  /**
   * 头部数据，最新enqueue的数据
   */
  front: function () {
    if (this._queue_.front > this._queue_.rear) {
      return this._queue_.list[this._queue_.front - 1];
    }
  },
  /**
   * 尾部数据，最早enqueue的数据
   */
  rear: function () {
    if (this._queue_.front > this._queue_.rear) {
      return this._queue_.list[this._queue_.rear];
    }
  },
  /**
   * 入队
   * @param {*} data 任意数据
   */
  enqueue: function (data) {
    // 队列已满，无法入队
    if (this.length() >= this.maxSize()) {
      return false;
    }
    this._queue_.list.push(data);
    this._queue_.front++;
    return true;
  },
  /**
   * 出队
   */
  dequeue: function () {
    if (this._queue_.rear < this._queue_.front) {
      let res = this._queue_.list[this._queue_.rear++];
      // 垃圾回收
      if (this._queue_.rear > 20) {
        this.list();
      }

      return res;
    }
    // 没有数据
    return false;
  },
  /**
   * 获取完整的队列，是一个数组
   */
  list: function () {
    let res = this._queue_.list.slice(this._queue_.rear, this._queue_.front);
    this._queue_.list = res;
    this._queue_.rear = 0;
    this._queue_.front = res.length;

    return res;
  },
  /**
   * 打印
   */
  toString: function () {
    let res = this._queue_.name + ' { ';
    for (let i = this._queue_.rear; i < this._queue_.front; i++) {
      let data = this._queue_.list[i];
      if (typeof data.toString === 'function') {
        res += data.toString();
      } else {
        res += String(data);
      }

      if (i !== this._queue_.front - 1) {
        res += ', ';
      }
    }

    res += ' }';

    return res;
  },
};

// test
let q = new Queue({ size: 6, name: 'JsQueue' });
for (let i = 0; i < 5; i++) {
  q.enqueue(i);
  console.log(q.isEmpty(), q.length(), q.maxSize());
}

console.log(q.front(), q.rear(), q.isEmpty(), q.length(), q.maxSize());
q.enqueue(6);
console.log(q.front(), q.rear(), q.isEmpty(), q.length(), q.maxSize());
q.dequeue();
q.dequeue();
q.enqueue(6);
q.enqueue(7);
q.enqueue(8);
console.log(q.front(), q.rear(), q.isEmpty(), q.length(), q.maxSize());
q.dequeue();
q.enqueue(9);

console.log(q.list());
q.dequeue();
q.enqueue(1);
console.log(q.front(), q.rear(), q.isEmpty(), q.length(), q.maxSize());
console.log(q.list());
console.log(q.toString());
