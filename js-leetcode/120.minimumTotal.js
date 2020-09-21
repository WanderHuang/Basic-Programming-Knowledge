/**
 * @param {number[][]} triangle
 * @return {number}
 */
var minimumTotal = function(triangle) {
  let row = triangle.length;
  let col = 0;
  if (row !== 0) {
    col = triangle[0].length;
  } else {
    return 0
  }

  let dp = new Array(row).fill(0).map(_ => new Array(col).fill(0));

  // for(let j = 0; j < col; j++) {
  //   dp[0][j] = triangle[0][j];
  // }

  dp[0][0] = triangle[0][0];
  for(let i = 1; i < row; i++) {
    dp[i][0] = dp[i - 1][0] + triangle[i][0];
    for(let j = 0; j < col; j++) {
      dp[i][j] = Math.max(dp[i - 1][j - 1], dp[i - 1][j]) + triangle[i][j];
    }
    dp[i][i] = dp[i - 1][i - 1] + triangle[i][i];
  }

  return Math.min(...dp[row - 1]);
};