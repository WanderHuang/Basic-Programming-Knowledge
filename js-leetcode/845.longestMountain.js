/**
 * [2, 1, 4, 7, 3, 2, 5]
 * => [1, 4, 7, 3, 2]
 * @param {number[]} A
 * @return {number}
 */
var longestMountain = function (A) {
  // go down / up, but is not mount
  if (A.length < 3) return 0;

  let len = A.length;
  let max = 0;

  let pivot = 1;
  while(pivot < len - 1) {
    let left = pivot - 1;
    let right = pivot + 1;

    if (A[left] < A[pivot] && A[pivot] > A[right]) {
      while(left > 0 && A[left - 1] < A[left]) {
        left--;
      }
      while(right < len && A[right + 1] < A[right]) {
        right++;
      }

      max = Math.max(max, right - left + 1);
    }

    pivot++;
  }

  return max;
};