/**
 * @param {string} s
 * @return {number}
 */
var longestPalindrome = function(s) {
  // 只包含英文字符
  // aa
  // aba
  // AaA

  let map = new Map();

  for(let i = 0; i < s.length; i++) {
    let key = s[i];
    if (map.has(key)) {
      map.set(key, map.get(key) + 1);
    } else {
      map.set(key, 1);
    }
  }

  let even = [];
  let odd = [];
  for(let v of map.values()) {
    if (v % 2 === 1) {
      even.push(v);
      odd.push(v - 1);
    } else {
      odd.push(v);
    }
  }

  if (even.length) {
    odd.push(1);
  }

  return odd.reduce((prev, curr) => prev + curr);
};

console.log(longestPalindrome('aaabbbbccc'))