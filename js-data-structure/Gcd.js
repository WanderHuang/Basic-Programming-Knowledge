/**
 * 欧几里得算法：计算两数最大公约数
 * @param {*} a 
 * @param {*} b 
 */
function gcd (a, b) {

  if (a % b === 0) return b;

  let temp = Math.floor(a % b);
  a = b;
  b = temp;

  return gcd(a, b);
}

console.log(gcd(10, 8));
console.log(gcd(10, 20));
console.log(gcd(66, 32));
console.log(gcd(70, 49));


// 意义：能用来度量这两个数字的最大单位
// -- -- -- -- -- -- -- -- -- -- -- -- --  26
// -- -- -- -- -- -- -- -- -- -- --        24
// --                                      2


//  方法：辗转相除