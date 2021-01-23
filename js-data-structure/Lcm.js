const gcd = require('./Gcd');
/**
 * 最小公倍数
 * @param {*} a 
 * @param {*} b 
 */
function lcm(a, b) {
  let c = gcd(a, b);

  return a * b / c;
}

console.log('lcm:', lcm(4, 7));
console.log('lcm:', lcm(14, 72));
console.log('lcm:', lcm(42, 12));
console.log('lcm:', lcm(6, 8));