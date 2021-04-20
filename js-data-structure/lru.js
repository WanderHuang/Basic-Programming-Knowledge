// latest recently used cache
// implemented by javascript

function Cache(props = {}) {
  this.capacity = props.capacity || 100;

  this.counter = 0;

  this.head = new Node("head");
  this.tail = new Node("tail");

  this.head.after = this.tail;
  this.tail.before = this.head;

  // key-node映射
  this.map = new Map();

  // 头部插入
  this.headInsert = function (node) {
    node.after = this.head.after;
    node.before = this.head;
    this.head.after.before = node;
    this.head.after = node;
  };

  // 删除节点
  this.deleteNode = function (node, next) {
    node.before.after = next;
    if (next) {
      next.before = node.before;
    }
  };
}

Cache.prototype.set = function set(key, val) {
  let node = new Node(key, val);

  this.headInsert(node);

  this.map.set(key, node);
  if (node.after !== this.tail) {
    this.map.set(node.after.key, node.after);
  }

  // 容量增加
  this.counter++;

  // 删除
  if (this.counter >= this.capacity) {
    let last = this.tail.before;
    let key = last.key;
    this.map.delete(key);
    if (last !== this.head) {
      this.deleteNode(last, this.tail);
      this.counter--;
    }
  }
};

Cache.prototype.get = function get(key) {
  let ret = this.map.get(key);
  console.log(ret.before.val, ret.after.val, ret.val);
  if (ret) {
    // 断链并加入头部
    let before = ret.before;
    let after = ret.after;
    before.after = after;
    after.before = before;

    this.headInsert(ret);

    this.map.set(ret.key, ret);
    if (before !== this.head) {
      this.map.set(before.key, before);
    }
    if (after !== this.tail) {
      this.map.set(after.key, after);
    }
  }

  return ret && ret.val;
};

Cache.prototype.has = function has(key) {
  return this.map.has(key);
};

Cache.prototype.top = function top(num, all = false) {
  let start = this.head;
  let ret = [];

  let i = 0;
  while (i < num) {
    start = start.after;

    if (start !== this.tail) {
      let val = all ? [start.key, start.val] : start.val;
      ret.push(val);
    } else {
      break;
    }
    i++;
  }
  return ret;
};

function Node(key, val) {
  this.key = key;
  this.val = val;
  this.before = null;
  this.after = null;
}

module.exports = Cache;
module.exports.Cache = Cache;

let cache = new Cache({ capacity: 10 });

cache.set("a", 1);
cache.set("b", 2);

console.log(cache.top(5));

for (let i = 0; i < 10; i++) {
  let val = "x0" + i;
  cache.set(val, val);
}

console.log(cache.top(15));

cache.get("x07");
cache.get("x03");
cache.get("x04");

console.log(cache.top(15));
