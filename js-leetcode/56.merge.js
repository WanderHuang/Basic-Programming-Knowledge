/**
 * @param {number[][]} intervals
 * @return {number[][]}
 */
var merge = function(intervals) {
  intervals.sort((a, b) => a[0] - b[0]);
  
  
  let res = [];

  for(let i = 0; i < intervals.length; i++) {
    if (!res.length) {
      res.push(intervals[i]);
    } else {
      let last = res[res.length - 1];

      if (last[1] < intervals[i][0]) {
        res.push(intervals[i])
      } else if (last[1] < intervals[i][1]) {
        last[1] = intervals[i][1]
      }
    }
  }


  return res;
};

console.log(merge([[1,3],[2,6],[8,10],[15,18]]))
