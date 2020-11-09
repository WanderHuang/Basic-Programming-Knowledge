/**
 * @param {string[][]} tickets
 * @return {string[]}
 */
var findItinerary = function(tickets) {
  let map = new Map();
  tickets.forEach(([from, to]) => {
    let arr = map.get(from)
    if (!arr) {
      arr = [];
    }

    arr.push(to);
    arr.sort((a, b) => a.charCodeAt() - b.charCodeAt());
    map.set(from, arr);
  });

  // console.log(map);

  let arr = map.get('JFK');

  let res = ['JFK'];


  while(arr && arr.length) {
    let next;
    let first = map.get(arr[0]);
    let second = map.get(arr[1]);
    if (!first && second) {
      next = arr.splice(1, 1)[0];
    } else {
      next = arr.shift();
    }


    res.push(next);
    arr = map.get(next);
  }

  return res;


};

console.log(findItinerary([["JFK","KUL"],["JFK","NRT"],["NRT","JFK"]]))
console.log(findItinerary([["JFK","SFO"],["JFK","ATL"],["SFO","ATL"],["ATL","JFK"],["ATL","SFO"]]))