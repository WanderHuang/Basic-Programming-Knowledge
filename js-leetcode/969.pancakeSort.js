/**
 * @param {number[]} arr
 * @return {number[]}
 */
var pancakeSort = function (A) {
  const res = [];
  let len = A.length;
  const count = A.length;
  while (len) {
    const max = Math.max.apply(null, A.slice(0, len));
    const index = A.indexOf(max);
    //判断边界情况
    //如果最大值刚好在为排序的数组的最后面，则不用翻转数组，直接进行下一次循环
    if (index === len - 1) {
      len--;
      continue;
    }
    //如果最大值刚好在首位，则只需要翻转一次数组
    if (index === 0) {
      A = A.slice(0, len).reverse().concat(A.slice(len, count));
      res.push(len);
      len--;
      continue;
    } else {
      //其他情况都需要翻转两次数组
      A = A.slice(0, index + 1)
        .reverse()
        .concat(A.slice(index + 1, count));
      if (len !== count) {
        A = A.slice(0, len).reverse().concat(A.slice(len, count));
      } else {
        A.reverse();
      }
      res.push(index + 1);
      res.push(len);
      len--;
      continue;
    }
  }
  return res;
};

console.log(pancakeSort([3, 2, 4, 1]));

// 3 2 4 1
// 4 2 3 1
// 1 3 2 4
