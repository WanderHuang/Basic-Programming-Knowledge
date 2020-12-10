/// n, [0 ~ 10^n]
pub fn run(n: i32) -> i32 {

    if  n == 0 {
      1
    } else if n == 1 {
      10
    } else {
      let mut dp = vec![0; (n as usize) + 1];
  
      dp[0] = 1;
      dp[1] = 10;
  
      for i in 2..=(n as usize) {
  
          // 上一次的值 + (i - 1位数字的组合数)) * 可以插入的数字个数
          dp[i] = dp[i - 1] + (dp[i - 1] - dp[i - 2]) * (10 - (i - 1))
      }
  
      dp[n as usize] as i32
    }

}

#[cfg(test)]
mod tests {
    #[test]
    fn test() {
        let res = super::run(4);

        assert_eq!(res, 0);
    }
}
