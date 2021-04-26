/**
 *  * @param {number[]} nums
 *   * @return {boolean}
 *    */
var increasingTriplet = function (nums) {
  // 2 1 5 0 4 6
  // 找到 i j k 满足
  // i < j < k 且 nums[i] < nums[j] < nums[k]
  //
  // 2 1 5 0 6 4
  // a
  //
  // 2 1 5 0 6 4
  // 2 1 5 0 4 6
  //   a
  //
  // 2 1 5 0 6 4  b更新表明存在比a大的值
  //   a b
  //
  // 2 1 5 0 6 4  a更新表明存在比a小的值，此时b前面仍然存在着比a小的值，只需要找到比b大的值就满足3个数字
  //     b a
  //
  // 2 1  5 0 6 4 t表示找到答案。由于此时b的index比a的index小，因此对应的索引为a' b t
  //   a' b a t
  //
  //   这种方法非常巧妙
  //   1. 辗转替换。总是有值：a < b;
  //   2. 每次a改变值总是最小的，每次b改变值总是能保证前面有比b更小的数字。而且题目只需要找到三个数字，因此只要能找到比b大的数字就行了，理论上此方法可以应用到流上，不需要看到数组的末尾。
  //   3. 其实每次操作的时候，index是预知的。因此b元素的存在总是代表前面已经有比他小的数字了。
  //   4. 由于3保证了这一点，因此只需要找到比b大的数字即可。
  let a = Number.MAX_SAFE_INTEGER;
  let b = Number.MAX_SAFE_INTEGER;

  let m, n, p;
  let lastM;

  for (let i = 0; i < nums.length; i++) {
    let x = nums[i];
    if (x > b) {
      p = i;
      if (m > n) console.log(lastM, n, p);
      else console.log(m, n, p);

      return true;
    } else if (x <= a) {
      a = x;
      lastM = m;
      m = i;
    } else {
      b = x;
      n = i;
    }
  }

  return false;
};

console.log(increasingTriplet([1, 2, 3, 4, 5]));
console.log();

console.log(increasingTriplet([2, 1, 5, 0, 6, 4]));
