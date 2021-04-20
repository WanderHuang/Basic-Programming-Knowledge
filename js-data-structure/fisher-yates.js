// 随机置换算法
//
// 每次从剩余数字中选择一个数和最后的数置换，尾部长度减一。循环
//
function shuffle(arr) {
  let pivot = arr.length;
  while (pivot) {
    let rand = Math.floor(Math.random() * pivot);

    swap(rand, pivot - 1);
    pivot--;
  }

  return arr;

  function swap(i, j) {
    let tmp = arr[i];
    arr[i] = arr[j];
    arr[j] = tmp;
  }
}

module.exports = shuffle;

let arr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

console.log(shuffle(arr));
