/**
 * @param {number[]} nums
 * @return {number}
 */
var jump = function (nums) {
	let len = nums.length;
	let dp = new Array(len).fill(0);
	// 下一次跳跃的点有没有最小抵达次数
	let hasValue = 0;
	for(let i = 0; i < len; i++) {
		let end = i + nums[i];
		// 如果已经有最小抵达次数，跳过
		if (hasValue > end) continue
		// 下一个地点需要上一个地点+1
		for(let j = i + 1; j <= end; j++) {
			if (!dp[j]) {
				dp[j] = dp[i] + 1;
			}
			// 已经抵达终点，返回值
			if (j === nums.length - 1) return dp[j];
		}
		hasValue = end;
	}

	return dp[nums.length - 1]
};

// 6
console.log(jump([1,2,1,1,3,1,5,1,2, 2,3,1,1,4]))
// 1,2,1,1,3,1,5,1,2, 2,3,1,1,4
// 0 1 2 2 3 4 4 4 5  5 5 5
// nums = [2,3,1,1,4]
//         x x     x
//         0 1 1 2 2
// nums = [2,3,0,1,4]
//         x x     x
