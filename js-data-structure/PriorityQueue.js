// priority
// 优先队列：保证每次取数据都是优先级数字最小的
// KEY： 应该用最小堆实现

/**
 * 最小堆
 *
 * ITEM: (value: any, priority: number)
 */
class MinHeap {
  constructor() {
    this.heap = [];
  }

  /** 从Array或ArrayLike构建Heap。对象需要存在value，priority字段 */
  static from(arr) {
    let next = arr;
    if (!arr instanceof Array) {
      try {
        next = Array.from(arr);
      } catch (error) {
        return new MinHeap();
      }
    }

    let heap = new MinHeap();

    next.forEach((item) => {
      heap.insert(item);
    });
  }

  toString() {
    return JSON.stringify(this.data);
  }

  // 插入数据，插入失败返回false
  insert(item) {
    if (
      !(item && typeof item === "object" && typeof item.priority === "number")
    ) {
      return false;
    }

    // 插入数据
    this.heap.push(item);

    // 从底部开始从新构建树，确保最小节点到顶点
    let curr = this.heap.length - 1;
    let parent = Math.floor((curr - 1) / 2);
    while (parent > 0) {
      // 交换: 当前节点priority比父节点小，冒泡上去
      if (this.heap[curr].priority < this.heap[parent].priority) {
        let tmp = this.heap[curr];
        this.heap[curr] = this.heap[parent];
        this.heap[parent] = tmp;
      }

      curr = parent;
      parent = Math.floor((curr - 1) / 2);
    }

    return true
  }

  // 删除头节点
  delete() {
    let curr = 0;

    // 从头部取值返回
    let returnValue = this.heap[curr];
    let last = this.heap.length - 1;

    // 尾部数据填充头部
    this.heap[curr] = this.heap.pop();

    // 从头部开始更新整个树形结构
    while (curr < last) {
      // 左右子树
      let left = 2 * (curr + 1) - 1;
      let right = 2 * (curr + 1);

      // 选择最小节点: 因为要冒泡最小的到树形结构顶部
      let min = left;

      if (right < last) {
        min =
          this.heap[left].priority > this.heap[right].priority ? right : left;
      }

      // 把min节点冒泡
      if (min < last && this.heap[curr].priority > this.heap[min].priority) {
        let tmp = this.heap[curr];
        this.heap[curr] = this.heap[min];
        this.heap[min] = tmp;
      }

      // 递归: min的值交换到curr后，curr指向min，继续从小节点冒泡
      curr = min;
    }

    return returnValue;
  }
}

class Priority {
  constructor(capacity = 100) {
    this.heap = new MinHeap();
    this.capacity = capacity;
  }

  enqueue(value, priority) {
    this.heap.insert({ priority, value });
  }

  dequeue() {
    return this.heap.delete();
  }
}

let p = new Priority();

p.enqueue("A", 1);
p.enqueue("D", 4);
p.enqueue("C", 2);
p.enqueue("B", 3);
p.enqueue("E", 5);
p.enqueue("A", 8);
p.enqueue("B", 1);

console.log(p.dequeue());
console.log(p.dequeue());
console.log(p.dequeue());
console.log(p.dequeue());
console.log(p.dequeue());
console.log(p.dequeue());
console.log(p.dequeue());
