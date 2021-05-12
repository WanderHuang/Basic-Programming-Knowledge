// TreeNode {val, left, right}
// 拆分二叉树
var splitBST = function (root, V) {
  if (!root) return [null, null]
	if (root.val <= V) {
		let list = splitBST(root.right, V);
		root.right = list[0];
		list[0] = root;
		return list
	} else {
		let list = splitBST(root.left, V);
		root.left= list[1];
		list[1] = root;

		return list
	}
};
