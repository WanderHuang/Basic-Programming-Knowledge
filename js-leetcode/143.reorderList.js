/**
 *  * Definition for singly-linked list.
 *   * function ListNode(val, next) {
 *    *     this.val = (val===undefined ? 0 : val)
 *     *     this.next = (next===undefined ? null : next)
 *      * }
 *       */
/**
 *  * @param {ListNode} head
 *   * @return {void} Do not return anything, modify head in-place instead.
 *    */
var reorderList = function (head) {
  // 1 2 3 4   5...n
  // 1 n 2 n-1 4....
  if (!head) return head;

  let slow = head;
  let fast = head.next;

	// 快慢指针寻找中点
  while (fast && fast.next) {
    slow = slow.next;
    fast = fast.next.next;
  }

  let mid = slow.next;
  slow.next = null;

  let l2 = reverse(mid);
  let l1 = head;

	// 拉链合并
  while (l1 && l2) {
    let nxt = l1.next;
    l1.next = l2;
    l2 = l2.next;
    l1.next.next = nxt;
    l1 = nxt;
  }

  return head;

	// 反转链表
  function reverse(head) {
    if (!head) return head;
    let p = null;
    let q = head;
    while (q) {
      let t = q.next;
      q.next = p;
      p = q;
      q = t;
    }

    return p;
  }
};
