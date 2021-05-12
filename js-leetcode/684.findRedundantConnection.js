/**
 * 并查集
 * [1, 2] [1, 3] [2, 3]
 *
 * 0 1 2 3
 *   1 2 3
 *   2 2 3
 *
 *
 * 前提条件
 * 1. 树是连通且无环的无向图
 * 2. 树有N个节点则边有N-1条
 * 3. 树附加一条边后形成的无向图会出现圆环
 * 并查集方法
 * 1. 初始时每个节点都属于不同的连通分量，遍历每一条边
 * 2. 如果边的两个顶点属于不同的连通分量则说明遍历到此边之前，两个顶点不连通，因此当前边不会导致环出现，合并这两个顶点的连通分量
 * 3. 如果两个顶点属于相同的连通分量则说明在遍历到此边之前两个顶点已经连通，会导致环出现，返回答案为这两个顶点
 *
 */
var findRedundantConnection = function (edges) {
  let n = edges.length;

  // 构造n个集合
  let containers = new Array(n + 1);

  for (let i = 1; i <= n; i++) {
    containers[i] = i;
  }

  for (let i = 0; i < n; i++) {
    console.log(containers);
    let [u, v] = edges[i];

    if (find(containers, u) !== find(containers, v)) {
      union(containers, u, v);
    } else {
      console.log(containers);
      return [u, v];
    }
  }

  // 找到index指向的集合属于第几个集合
  function find(containers, index) {
    // 不相等 继续往上遍历，并将递归遍历的值赋值给当前的index
    if (containers[index] !== index) {
      containers[index] = find(containers, containers[index]);
    }

    // 最终集合
    return containers[index];
  }

  // 合并u集合和v集合
  function union(containers, u, v) {
    containers[find(containers, u)] = find(containers, v);
  }
};

console.log(
  findRedundantConnection([
    [1, 2],
    [1, 3],
    [2, 3],
  ])
);
console.log(
  findRedundantConnection([
    [1, 2],
    [2, 3],
    [3, 4],
    [1, 4],
    [1, 5],
  ])
);
