// ============================
// =========== 链表 ============
// ============================
// 对象访问天然就是链表形式

// 双向链表 解决更普遍的问题，单向链表无法获取头部信息
function Node(val) {
  this.next = null;
  this.prev = null;
  this.val = val
}

Node.create = function(val) {
  return new Node(val)
}

function fromArray(arr) {
  return function(generate) {
    let head = generate('__head__');
    let last = arr.reduce((prev, val, index) => {
      let node = generate(val);
      prev.next = node;
      node.prev = prev;

      return prev.next;
    }, head);

    let tail = generate('__tail__');
    last.next = tail;
    tail.prev = last;

    return [head, tail]
  }
}

function List(arr = []) {
  const [head, tail] = fromArray(arr)(Node.create);

  this.head = head;
  this.tail = tail;

  this.len = arr.length;

  let ctx = this;

  this.__list__ = {
    insertNode(before, after, node) {
      node.prev = before;
      node.next = after;
      before.next = node;
      after.prev = node;

      ctx.len++;
    },
    deleteNode(node) {
      if (node instanceof Node) {
        let before = node.prev;
        let after = node.next;
        if (before) {
          before.next = after;
        }
        if (after) {
          after.prev = before;
        }

        ctx.len--;
      }
    }
  }
}

List.from = function(arr) {
  if (Array.isArray(arr)) {
    return new List(arr);
  }
}

List.createNode = Node.create;

List.prototype.insertHead = function(val) {

  this.__list__.insertNode(this.head, this.head.next, Node.create(val));

  return 0
}

List.prototype.insertTail = function(val) {
  this.__list__.insertNode(this.tail.prev, this.tail, new Node(val));

  return this.len - 1;
}

List.prototype.insert = function(val, index) {
  let pivot = this.head.next;
  let count = 0;

  while(count < index && pivot !== this.tail) {
    pivot = pivot.next;
    count++;
  }

  if (count === index) {
    this.__list__.insertNode(pivot.prev, pivot, Node.create(val));

    return index;
  }

  return -1;
}

List.prototype.delete = function(index) {

  if (index >= this.len) {
    return false;
  }

  let pivot = this.head.next;
  let count = 0;
  while(count < index) {
    pivot = pivot.next;
    count++;
  }

  this.__list__.deleteNode(pivot);

  return true
}

List.prototype.deleteHead = function() {
  if (this.len) {
    this.__list__.deleteNode(this.head.next);

    return true
  }

  return false;
}

List.prototype.deleteTail = function() {
  if (this.len) {
    this.__list__.deleteNode(this.tail.prev);

    return true
  }

  return false;
}

List.prototype.to = function (type) {
  if (type === 'array') {
    let first = this.head.next;
    let res = [];
    while(first.next) {
      res.push(first.val);
      first = first.next;
    }

    return res;
  }

  return this.toString();
}


// 导出

module.exports = List;



// 测试代码

let list = List.from([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);

console.log(list.to('array'));
list.insert(5, 5);
console.log(list.to('array'));
list.insertHead(1);
list.insertHead(9);
list.insertTail(9);
list.insertTail(1);
console.log(list.to('array'));


list.deleteHead();
list.deleteTail();
console.log(list.to('array'));

list.delete(12);
list.delete(11);
list.delete(10);
list.delete(10);
list.delete(5);
console.log(list.to('array'));


