pub fn run(strs: Vec<String>, m: i32, n: i32) -> i32 {
    let mut dp = vec![vec![0; n as usize + 1]; m as usize + 1];

    for s in strs {
        // 统计迭代剩余个数.count
        let zero = s.chars().filter(|&c| c == '0').count();
        let one = s.chars().filter(|&c| c == '1').count();

        // Bottom-up
        for i in (zero..=(m as usize)).rev() {
            for j in (one..=(n as usize)).rev() {
                dp[i][j] = dp[i][j].max(dp[i - zero][j - one] + 1);
            }
        }
    }

    dp[m as usize][n as usize]
}

#[cfg(test)]
mod tests {
    #[test]
    fn test() {
        let res = super::run(
            vec![
                "10".to_string(),
                "0001".to_string(),
                "111001".to_string(),
                "1".to_string(),
                "0".to_string(),
            ],
            5,
            3,
        );

        assert_eq!(res, 4);
    }
}
