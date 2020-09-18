/**
 * @param {string} input
 * @return {number[]}
 */
var diffWaysToCompute = function (input) {
  const recursive = (nums, ops) => {
    if (nums.length == 1) {
      return nums;
    } else {
      let res = [];
      for (let i = 1; i < nums.length; i += 1) {
        // 回溯算法 -> 也可以用动态规划解决此问题
        //  1 +  2 -   3 * 4
        //  1 + (2 -   3 * 4)
        //  1 +  2 -  (3 * 4)
        // (1 +  2) - (3 * 4)
        // (1 +  2 -   3) * 4
        // (1 + (2 -   3)) * 4
        //  1 + (2 -   3) * 4
        // left 和 right 其实就是子问题了
        // -> ((1 * 2) - (2 * 1))
        //    -> 子问题 (2 - 2)
        //        -> 子问题 0
        let left = recursive(nums.slice(0, i), ops.slice(0, i - 1));
        let right = recursive(nums.slice(i), ops.slice(i));
        for (const a of left) {
          for (const b of right) {
            const op = ops[i - 1];
            switch (op) {
              case '-':
                res.push(a - b);
                break;
              case '+':
                res.push(a + b);
                break;
              case '*':
                res.push(a * b);
                break;
            }
          }
        }
      }
      return res;
    }
  };

  return recursive(
    input.split(/[\-\+\*]/).map((value) => Number(value)),
    input.split(/[0-9]*/).filter((opt) => opt && opt.length)
  );
};


// test
console.log(parse('2*3-4*5'));
