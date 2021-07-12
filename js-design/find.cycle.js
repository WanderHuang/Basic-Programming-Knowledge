/// 一个节点，模拟一个引用类型
function Node(value) {
  this.name = value;
  this.children = [];
}

Node.prototype.toString = function () {
  return this.name;
};

/// JSON.stringify(obj[, replacer[, space]])在转换循环引用的时候会报错，转换function时会忽略
/// 我们来模拟检测一个node是否存在循环引用的情况
function findCycle(nodes) {
  for (const node of nodes) {
    const route = new Set();

    console.log("- check this root", node.name);

    const bool = dfs(node, route);
    if (bool) {
      console.log("Cycular portal: ", node);
    }
  }

  return false;

  function dfs(o, route) {
    if (route.has(o)) {
      console.log("Cycle Found: ", o);
      console.table(Array.from(route));
      return true;
    }

    console.log("-     visit", o.name);
    route.add(o);

    if (o.children && o.children.length) {
      for (const child of o.children) {
        let bool = dfs(child, route);
        if (bool) {
          return bool;
        } else {
          route.delete(child);
        }
      }
    }

    return false;
  }
}

var a = new Node("a");
var b = new Node("b");

a.children.push(b);
b.children.push(a);

var c = new Node("c");
var d = new Node("d");
var e = new Node("e");
var f = new Node("f");
var g = new Node("g");
var h = new Node("h");

// e
// f
e.children.push(f);
e.children.push(g);
e.children.push(c);

// c
// d e g
c.children.push(d);
c.children.push(e);
c.children.push(g);

// f
// d g
f.children.push(d);
f.children.push(g);

// h
// e c a
h.children.push(e);
h.children.push(c);
h.children.push(a);

console.log(findCycle([new Node("c"), new Node("d"), c, f, h]));



// 循环检测的应用：
// 1. JSON序列化和反序列化JSON.stringify, JSON.parse
// 2. excel表单的计算公式循环检测
// 3. dom树循环appendChild检测
//
//
// 实际上用JSON.stringify() 可以检测一个对象是否存在循环引用，但我们自己写这个相当于理解它的底层实现算法
// 核心：缓存链路上已经访问过的对象
