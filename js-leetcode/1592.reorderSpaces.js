/**
 * @param {string} text
 * @return {string}
 */
var reorderSpaces = function(text) {
  let length = text.length;
  let letters = text.split(' ').map(word => {
    word.trim();
    return word
  }).filter(word => word.length)


  let gap = letters.length - 1;

  let letterCount = letters.reduce((prev, curr) => curr.length + prev, 0);

  let count = length - letterCount;

  let each = gap === 0 ? 0 : Math.floor(count / gap);

  let rest = gap === 0 ? count : count % gap;

  return letters.join(' '.repeat(each)) + ' '.repeat(rest);

};


console.log(reorderSpaces('  this'))