/**
 * 二叉搜索树
 * 1. 中序遍历出来是ascend的
 * 2. 递归算法完了之后可以用迭代替换递归降低遍历次数
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @param {number} k
 * @return {number}
 */
var kthSmallest = function(root, k) {
    let arr = [];
    function recursive(root) {
      if (!root) return;
      recursive(root.left);
      arr.push(root.val);
      recursive(root.right);
    }

    recursive(root);

    return arr[k - 1]
};