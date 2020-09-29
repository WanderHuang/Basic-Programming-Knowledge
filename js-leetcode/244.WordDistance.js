/**
 * 查找距离的题，是与哈希算法有关系吧，假如设计一个哈希存储的数据库，就需要最快插入
 * @param {string[]} words
 */
var WordDistance = function(words) {
  this.words = words;
};

/** 
 * @param {string} word1 
 * @param {string} word2
 * @return {number}
 */
WordDistance.prototype.shortest = function(word1, word2) {
  let word1Index = [];
  let word2Index = [];

  // 时间复杂度n
  for(let i = 0; i < this.words.length; i++) {
    if (this.words[i] === word1) {
      word1Index.push(i);
    } else if (this.words[i] === word2) {
      word2Index.push(i);
    }
  }

  word1Index.sort((a, b) => a - b);
  word2Index.sort((a, b) => a - b);

  let min = Number.MAX_SAFE_INTEGER;
  for(let i = 0; i < word1Index.length; i++) {
    for(let j = 0; j < word2Index.length; j++) {
      let distance = Math.abs(word2Index[j] - word1Index[i]);
      if (distance < min) {
        min = distance;
      }
    }
  }

  console.log(word1, word2, min);

  return min;
  
};

/**
 * Your WordDistance object will be instantiated and called as such:
 * var obj = new WordDistance(words)
 * var param_1 = obj.shortest(word1,word2)
 */



// let dict = new WordDistance(['a', 'b', 'c', 'd', 'c', 'a', 'e']);

// dict.shortest('a', 'e');
// dict.shortest('a', 'd');



// 更好的解决方案
// 1. 构造函数内置index 空间换时间
// 2. while循环代替双重循环，因为只需要找到最小值 => 更好的移位方法
// /**
//  * @param {string[]} words
//  */
// var WordDistance = function(words) {
//   const map = new Map();
//   for (let i = 0; i < words.length; i++) {
//     if (map.has(words[i])) {
//       map.get(words[i]).push(i);
//     } else {
//       map.set(words[i], [i]);
//     }
//   }
//   this.map = map;
// };

// /** 
//  * @param {string} word1 
//  * @param {string} word2
//  * @return {number}
//  */
// WordDistance.prototype.shortest = function(word1, word2) {
//   const idx1 = this.map.get(word1);
//   const idx2 = this.map.get(word2);
//   let result = Infinity;
//   let i = 0, j = 0;
//   while (i < idx1.length && j < idx2.length) {
//     result = Math.min(result, Math.abs(idx1[i] - idx2[j]));
//     if (idx1[i] > idx2[j]) {
//       j++;
//     } else {
//       i++;
//     }
//   }
//   return result;
// };