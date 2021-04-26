// 按“之”字形打印二叉树
// 1. 奇数行左到右
// 2. 偶数行右到左
// 3. 双端队列。头、尾都可以添加数据
var levelOrder = function(root) {
	// 树没有输出
	if (!root) return []

	const queue = [[root, 0]], res = [];

	while(queue.length) {
		// 头
		const [node, lev] = queue.shift();
		
		if (!res[lev]) res[lev] = [];

		// 奇数逆序 偶数正序
		lev & 1 ? res[lev] ? res[lev].unshift(node.val) : res[lev] = [node.val] : res[lev] ? res[lev].push(node.val): res[lev] = [node.val];

		node.left && queue.push([node.left, lev + 1]);
		node.right && queue.push([node.right, lev + 1])

	}


}

// 要点
// 1. 队列要存储该元素是第几行的
// 2. res数组拿元素：奇数就unshift进去 偶数就push进去
// 3. 队列拿元素：统一用push，但要增加元素的层级
