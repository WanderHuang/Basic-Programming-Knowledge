/**
 * 旋转数组搜索
 * 本质上还是要二分查找，因为单纯的线性搜索时间复杂度已经为n了，利用ascending特性进行二分查找，到根号n。
 * 这里是一种变种，在ascending上加了rotated.
 *
 * 一种解法
 * 1. 从前往后，查找比target大的
 * 2. 从后往前，查找比target小的
 *
 * 该解法的本质是快排的一个划分算法，首尾指针相当于分别遍历rotatd后数字更大的一块内存和数字更小的一块内存
 * 4, 5, 6, 7, 0, 1, 2
 * [4, 5, 6, 7] [0, 1, 2]
 * start: [4, 5, 6, 7]
 * end  : [0, 1, 2]
 * 比谁先到
 * 最坏情况就是all/no rotation 即ascending/descending 此时遍历次数为n
 * 平均情况是在一块内存内找到
 * 这种解法不太像二分
 *
 *
 * 另一种解法
 * 上一种方案改进，每次查找都用二分法。
 * 二分之后，拿mid元素和首尾元素进行比较，确定区间是否是单纯的asceding区间，根据首尾元素和target比较确定下一次划分的区间范围
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var search = function (nums, target) {
  // 4, 5, 6, 7, 0, 1, 2
  if (!nums.length) return -1;

  let start = 0;
  let end = nums.length - 1;
  while (start <= end) {
    let mid = Math.floor((start + end) / 2);
    if (nums[mid] == target) return mid;
    // ascending
    if (nums[0] <= nums[mid]) {
      // partition
      // 4, 5, 6, 7, 0, 1, 2
      // include
      if (nums[0] <= target && target < nums[mid]) {
        end = mid - 1;
      } else {
        start = mid + 1;
      }
    } else {
      // has rotation
      // exclude
      if (nums[mid] < target && target <= nums[nums.length - 1]) {
        start = mid + 1;
      } else {
        end = mid - 1;
      }
    }
    // while(start < end && nums[start] < target) {
    //   start++;
    // }
    // if (nums[start] === target) {
    //   return start
    // }
    // while(start < end && nums[end] > target) {
    //   end--;
    // }
    // if (nums[end] === target) {
    //   return end
    // }
  }

  return -1;
};

console.log(search([4, 5, 6, 7, 0, 1, 2], 0));
