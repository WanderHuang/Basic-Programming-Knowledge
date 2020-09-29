/**
 * @param {number} N
 * @return {number}
 */
var binaryGap = function(N) {
  // positive N
  let indexBox = [];
  let count = 1;
  while(N) {
    if (N & 1 === 1)  {
      indexBox.push(count)
    }

    count++;

    N = N >> 1;
  }

  for(let i = 1; i < indexBox.length; i++) {
    indexBox[i - 1] = indexBox[i] - indexBox[i - 1];
  }
  indexBox.pop();

  console.log(indexBox)
  return indexBox.length ? Math.max(...indexBox) : 0;
};


console.log(binaryGap(8))