/**
 * @param {number[]} a
 * @return {number[]}
 */
var constructArr = function(a) {
    let len = a.length;

    if (len === 0) return [];

    let b = new Array(len).fill(0);

    b[0] = 1;
    for(let i = 1; i < len; i++) {
        if (i === 1) {
            b[i] = a[i - 1];
        } else {
            b[i] = b[i - 1] * a[i - 1];
        }

    }
    let last = 1;
    for(let i = len - 2; i >= 0; i--) {
        last *= a[i + 1];
        b[i] *= last;
    }
    
    return b;
};

// 比较巧妙
// 1. 向下遍历获取到前缀值
// 2. 当前值设定为1
// 3. 向上遍历获取后缀值
