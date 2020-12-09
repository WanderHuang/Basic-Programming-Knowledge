/**
 * @param {number} n
 * @param {number[][]} flights [u, w, v]
 * @param {number} src
 * @param {number} dst
 * @param {number} K
 * @return {number}
 */
var findCheapestPrice = function (n, flights, src, dst, K) {
  // 初始化DP
  // 1. dp[i][k]表示经过k次转机到达i所 使用的最少费用
  // 2. 首先初始化dp[src][0] ~ dp[src][k] => 0。因为如果目的地是出发地点的话，就不需要费用
  // 3. 循环读取k值和航班f, f0 为起始地点，f1 为目的地点， f2 为消耗。状态转移方程为
  //    当前目的地点的k次最小消费=Math.min(上一次计算的值, 当前其实地点为中点的k-1次转机的最小消费 + 本次航班消费)
  //    dp[f1][k] = Math.min(dp[f1][k], dp[f0][k-1] + f2)
  // dp[dst][K+1]为k次转机最小消费
  let dp = new Array(n)
  .fill(0)
  .map(() => new Array(K + 2).fill(Number.MAX_SAFE_INTEGER));
  for (let k = 0; k < n; k++) {
    dp[src][k] = 0;
  }

  for (let k = 1; k <= K + 1; k++) {
    for (let f of flights) {
      if (dp[f[0]][k - 1] !== Number.MAX_SAFE_INTEGER) {
        dp[f[1]][k] = Math.min(dp[f[1]][k], dp[f[0]][k - 1] + f[2]);
      }
    }
  }

  return dp[dst][K + 1] === Number.MAX_SAFE_INTEGER ? -1 : dp[dst][K + 1];
};

// 5
// [[1,2,10],[2,0,7],[1,3,8],[4,0,10],[3,4,2],[4,2,10],[0,3,3],[3,1,6],[2,4,5]]
// 0
// 4
// 1

// output 5

console.log(
  findCheapestPrice(
    5,
    [
      [1, 2, 10],
      [2, 0, 7],
      [1, 3, 8],
      [4, 0, 10],
      [3, 4, 2],
      [4, 2, 10],
      [0, 3, 3],
      [3, 1, 6],
      [2, 4, 5],
    ],
    0,
    4,
    1
  )
);
