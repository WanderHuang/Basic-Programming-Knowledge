/**
 * 实现对比
 * 1. 引用比较
 * 2. 值比较
 * 3. 递归比较
 * @param {*} a 
 * @param {*} b 
 */
const equals = (a, b) => {
  // 引用相等
  if (a === b) return true;
  // 内容相等
  if (a instanceof Date && b instanceof Date)
    return a.getTime() === b.getTime();
  // 非对象值相等
  if (!a || !b || (typeof a !== 'object' && typeof b !== 'object'))
    return a === b;
  // 空值相等
  if (a === null || a === undefined || b === null || b === undefined)
    return false;
  // 原型相等
  if (a.prototype !== b.prototype) return false;
  // 递归相等
  let keys = Object.keys(a);
  if (keys.length !== Object.keys(b).length) return false;
  return keys.every((k) => equals(a[k], b[k]));
};
