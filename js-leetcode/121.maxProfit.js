// 给定一个数组 prices ，其中 prices[i] 是一支给定股票第 i 天的价格。
// 设计一个算法来计算你所能获取的最大利润。你可以尽可能地完成更多的交易（多次买卖一支股票）。

/**
 * @param {number[]} prices
 * @return {number}
 */
var maxProfit = function (prices) {
	if (!prices) return 0;

	const len = prices.length;
	const dp = new Array(len);
	dp[0] = 0;
	let min = prices[0];

	for (let i = 1; i < len; i++) {
		const value = prices[i];
		if (value < min) {
			min = value;
		}

		const bonus = value - min;

		if (bonus > dp[i - 1]) {
			dp[i] = bonus;
		} else {
			dp[i] = dp[i - 1];
		}
	}

	return Math.max(...dp);
};
