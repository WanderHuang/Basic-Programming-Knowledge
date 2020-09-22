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

function Queue(size = 10) {
  this._queue_ = {
    size,
    front: 0,
    rear: 0,
    list: [],
  }
}

Queue.prototype = {
  isEmpty: function () {
    return  this._queue_.front === this._queue_.rear;
  },
  isFull: function() {
    return this.length() === this.maxSize();
  },
  length: function() {
    return this._queue_.front - this._queue_.rear;
  },
  maxSize: function() {
    return this._queue_.size;
  },
  front: function() {
    if (this._queue_.front > this._queue_.rear)  {
      return this._queue_.list[this._queue_.front - 1];
    }
  },
  rear: function() {
    if (this._queue_.front > this._queue_.rear)  {
      return this._queue_.list[this._queue_.rear];
    }
  },
  enqueue: function(data) {
    if (this.length() >= this.maxSize()) {
      return false
    }
    this._queue_.list.push(data);
    this._queue_.front++;
    return true
    
  },
  dequeue: function() {
    if (this._queue_.rear < this._queue_.front) {
      return this._queue_.list[this._queue_.rear++];
    }
    return false
  },
  list: function() {
    let res = this._queue_.list.slice(this._queue_.rear, this._queue_.front);
    this._queue_.list = res;
    this._queue_.rear = 0;
    this._queue_.front = res.length;
    return res;
  }
}


// test
let q = new Queue(5);
for(let i = 0; i < 5; i++) {
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
