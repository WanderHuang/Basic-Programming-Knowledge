/**
 * 第k长的数字，从流里面读取
 * @param {number} k
 * @param {number[]} nums
 */
var KthLargest = function(k, nums) {
  this.k = k;
  nums.sort((a, b) => b - a);

  if (nums.length > k) {
    this.queue = nums.slice(0, k);
  } else {
    this.queue = nums;
  }
};

/** 
 * @param {number} val
 * @return {number}
 */
KthLargest.prototype.add = function(val) {
  if (this.queue.length < this.k || val > this.queue[this.k - 1]) {
    this.queue.push(val);
    this.queue.sort((a, b) => b - a);
  }

  return this.queue[this.k - 1];
};

/**
 * Your KthLargest object will be instantiated and called as such:
 * var obj = new KthLargest(k, nums)
 * var param_1 = obj.add(val)
 */