pub fn run(prices: Vec<i32>, fee: i32) -> i32 {
    // 1, 3, 2, 8, 4, 9
    // 在此处买入 prices[0] = 1
    // 在此处卖出 prices[3] = 8
    // 在此处买入 prices[4] = 4
    // 在此处卖出 prices[5] = 9
    // 总利润: ((8 - 1) - 2) + ((9 - 4) - 2) = 8.

    let n = prices.len();
    // 第i天没有持有股票，全是现金
    let mut cash = 0;
    // 第i天持有股票 第0天持有股票需要付出prices[0]的价格
    let mut hold = 0 - prices[0];

    for i in 1..n {
        // 第i天没有持有股票 = Math.max(第i-1天没有持有股票，第i天持有股票并卖掉)
        // 卖出股票为收入，并需要支出fee
        cash = cash.max(hold + prices[i] - fee);
        // 第i天持有股票 = Math.max(第i-1天持有股票，第i天买入股票)
        // 买入股票为负收入
        hold = hold.max(cash - prices[i]);
    }
    return cash;
}

#[cfg(test)]
mod tests {
    #[test]
    fn test() {
        let res = super::run(vec![1, 3, 2, 8, 4, 9], 2);

        assert_eq!(res, 8);
    }
}
