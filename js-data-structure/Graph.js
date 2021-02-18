/**
 * 无向图/有向图
 *
 * 1. 图可以表示为G={V，E}，V表示图中所有顶点的集合，E表示图中所有边的集合。
 * 2. 通常可用邻接表或邻接矩阵来表示
 * 3. 有向图出度：顶点发出的边的数量。
 * 4. 有向图入度：指向该顶点的边的数量。
 */

// 示例 - 有向图的表示方法

// ```
// 1 -> 2 -> 5 -> 4 -> 2
// 1 -> 4 -> 2
// 3 -> 5
// 3 -> 6
// 6 -> 6
// ```

// 邻接表或邻接矩阵表示
// 1. 邻接表

// ```
// # 序号表示对应数字，[X]表示链表下一项，[/]表示链表下一项为空。

// 1|[X] -> 2|[X] -> 4|[/]
// 2|[X] -> 5|[/]
// 3|[X] -> 6|[X] -> 5|[/]
// 4|[X] -> 2|[/]
// 5|[X] -> 4|[/]
// 6|[X] -> 6|[/]
// ```

// 2. 邻接矩阵表示方法

// ```
// # 竖向表示起点，横向表示终点，1表示可达，0表示不可达

//   1|2|3|4|5|6
// -------------
// 1|0 1 0 1 0 0
// 2|0 0 0 0 1 0
// 3|0 0 0 0 1 1
// 4|0 1 0 0 0 0
// 5|0 0 0 1 0 0
// 6|0 0 0 0 0 1
// ```

// 实现有向图
// vertex 顶点
// edge 边
// adjacency 邻接
// degree 度

/**
 * 有向图构造
 * @param {*} vertex
 */
function Graph(vertex) {
  // 图顶点数量
  this.vertex = vertex;
  // 图边数量
  this.edge = 0;
  // 第i个顶点邻接列表
  this.adj = new Array(vertex).fill(0).map(() => new Array());
  // 第i个顶点的入度
  this.indegree = new Array(vertex);
}

/**
 * 增加一条边
 * @param {*} v 起点
 * @param {*} w 终点
 */
Graph.prototype.addEdge = function (v, w) {
  this.adj[v].push(w);
  this.indegree[w]++;
  this.edge++;
};

Graph.prototype.getAdj = function (v) {
  return this.adj[v];
};

Graph.prototype.getIndegree = function (v) {
  return this.indegree[v];
};

Graph.prototype.getOutdegree = function (v) {
  return this.adj[v].length;
};

Graph.prototype.getVertex = function () {
  return this.vertex;
};

Graph.prototype.getEdge = function () {
  return this.edge;
};

/// 有向图应用：环判定

function cycleCheck(graph) {
  let vertex = graph.getVertex();
  // 当前节点是否被标记
  let marked = new Array(vertex).fill(false);
  // 当前递归路径指向v的节点为edgeTo[v] 方便回溯
  let edgeTo = new Array(vertex);
  // 当前遍历调用栈
  let onStack = new Array(vertex).fill(false);
  // 圆环
  let cycle;
  // 所有圆环
  let total = [];
  for (let v = 0; v < vertex; v++) {
    if (!marked[v] && !cycle) {
      dfs(v);
    }
  }

  return total;

  // 深度优先搜索
  function dfs(v) {
    marked[v] = true;
    // 模拟递归调用栈
    onStack[v] = true;

    let dest = graph.adj[v];
    for (let i = 0; i < dest.length; i++) {
      let w = dest[i];
      // 有环状结构直接返回
      if (cycle) {
        return;
      } else if (!marked[w]) {
        // 当前节点第一次访问
        edgeTo[w] = v;
        dfs(w);
      } else if (onStack[w]) {
        // 在当前调用栈发现节点
        cycle = [];
        for (let j = v; j !== w; j = edgeTo[j]) {
          cycle.push(j);
        }

        cycle.push(w);
        cycle.push(v);

        if (hasCycle()) {
          console.log("发现圆环", cycle);
          total.push([...cycle]);
          cycle = undefined;
        }
      }
    }

    onStack[v] = false;
  }

  function hasCycle() {
    if (cycle) {
      let start = -1;
      let end = -1;
      cycle.forEach((v) => {
        if (start === -1) {
          start = v;
        }
        end = v;
      });

      if (start !== end) {
        return false;
      }
    }
    return true;
  }
}

let graph = new Graph(7);

// 处理邻接表

// ```
// # 序号表示对应数字，[X]表示链表下一项，[/]表示链表下一项为空。

// 1|[X] -> 2|[X] -> 4|[/]
// 2|[X] -> 5|[/]
// 3|[X] -> 6|[X] -> 5|[/]
// 4|[X] -> 2|[/]
// 5|[X] -> 4|[/]
// 6|[X] -> 6|[/]
// ```

graph.addEdge(1, 2);
graph.addEdge(2, 4);
graph.addEdge(2, 5);
graph.addEdge(3, 6);
graph.addEdge(6, 5);
graph.addEdge(4, 2);
graph.addEdge(5, 4);
graph.addEdge(6, 6);

cycleCheck(graph);

// 发现圆环 [ 4, 2, 4 ]
// 发现圆环 [ 6, 6 ]

// 处理excel单元格循环引用
// A1=B1+C3
// B1=1
// C1=A1+C2
// A2=3
// B2=2
// C2=1
// A3=3
// B3=C3+A3
// C3=B2+A1

function checkExcel(cells) {
  if (!(cells instanceof Array)) {
    throw new Error("Excel cells should be a string array");
  }
  // 预处理
  let cellMap = new Map();
  let numbMap = new Map();
  let graph = new Graph(10);
  // 单元格匹配
  let CELL_REG = /^[A-Z][1-9][0-9]*$/;
  // 数字匹配
  let NUMB_REG = /^[0-9]+$/;
  cells.forEach((cell, index) => {
    if (typeof cell !== "string") {
      throw new Error(`cell[${index}] should be string formula`);
    } else {
      let labels = cell.split("=").map((label) => label.trim());
      let start = labels.shift();
      setMap(start);
      labels.forEach((label) => {
        if (CELL_REG.test(label)) {
          setMap(label);
          graph.addEdge(cellMap.get(start), cellMap.get(label));
          // 支持加减乘除
        } else if (
          label.includes("+") ||
          label.includes("-") ||
          label.includes("*") ||
          label.includes("/")
        ) {
          let sublabels = mathHandler(label);
          sublabels.forEach((sub) => {
            setMap(sub);
            graph.addEdge(cellMap.get(start), cellMap.get(sub));
          });
        }
      });
    }
  });

  return cycleCheck(graph).map((cycle) =>
    cycle.map((item) => numbMap.get(item))
  );

  function setMap(key) {
    if (!cellMap.has(key)) {
      let val = cellMap.size + 1;
      cellMap.set(key, val);
      numbMap.set(val, key);
    }
  }

  function mathHandler(label, operator = ["+", "-", "*", "/"]) {
    let sublabel = [];
    let i = 0;
    let temps = label.split(operator[i]).map((item) => item.trim());
    i++;

    for (; i < operator.length; i++) {
      if (temps.length) {
        sublabel = sublabel.concat(temps.filter((item) => CELL_REG.test(item)));

        temps = temps
          .filter((item) => !CELL_REG.test(item))
          .reduce((prev, curr) => {
            if (curr.includes(operator[i])) {
              prev = prev.concat(
                curr.split(operator[i]).map((item) => item.trim())
              );
            } else {
              prev.push(curr);
            }

            return prev;
          }, []);
      }
    }

    return sublabel;
  }
}

let cells = [
  "A1=B1+C3",
  "B1=1",
  "C1=C1",
  "A2=B1 + B3",
  "B2=2",
  "C2=2",
  "A3=B2 + C2 * B3",
  "B3=C2 / B1 + A2",
  "C3=2",
];

let res = checkExcel(cells);

// C1 -> C1
// B3 -> A2 -> B3
if (res.length) {
  console.log("Excel 循环引用");
  res.forEach(item => {
    console.table(item)
  });
}
