/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} head
 * @return {number}
 */
var getDecimalValue = function(head) {
  let queue = [];
  while(head) {
    queue.unshift(head.val);
    head = head.next;
  }

  let res = 0;
  for(let i = 0; i < queue.length; i++) {
    if (queue[i] === 1) {
      res += Math.pow(2, i);
    }
  }

  return res;
};