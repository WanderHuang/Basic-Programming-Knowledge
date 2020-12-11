pub struct ISolution{}

impl ISolution {

  fn can_i_win(max_choosable_integer: i32, desired_total: i32) -> bool {
      // 总数小于目标值，必然失败
      if (1 + max_choosable_integer) * max_choosable_integer / 2 < desired_total {
          return false;
      }
  
      // AB两人轮番取值，需要
      // 1. 一个变量存储已经被取过的值
      // 2. 一个dp数组保存当前A能不能获胜
      return Self::helper(
          max_choosable_integer,
          desired_total,
          &mut vec![None; 1 << max_choosable_integer],
          0,
      );
  }
  
  fn helper(
      max_choosable: i32,
      desired_total: i32,
      dp: &mut Vec<Option<bool>>,
      state: usize,
  ) -> bool {
      match dp[state] {
          Some(b) => return b,
          None => {
              // 循环取值
              for i in 1..=max_choosable {
                  // cur为位数据，cur为1表示当前的值已经被取用了。跳过
                  let cur = 1 << (i - 1);
                  if (cur & state) != 0 {
                      continue;
                  }
  
                  // 取值有两种情况可以获胜
                  // 1. i已经大于想要到达的值desired_total。则A获胜
                  // 2. i虽然没有到，但到B时为false。则A也获胜。这里判断的helper函数就是用来判断B在A取了i的情况下是否失败
                  if desired_total - i <= 0
                      || Self::helper(max_choosable, desired_total - i, dp, state | cur) == false
                  {
                      dp[state] = Some(true);
                      return dp[state].unwrap();
                  }
              }
  
              // 取完了都没能获胜，则必然失败
              dp[state] = Some(false);
  
              dp[state].unwrap()
          }
      }
  }
}

#[cfg(test)]
mod tests {
    #[test]
    fn test() {
        let res = super::ISolution::can_i_win(15, 258);

        assert_eq!(res, true);
    }
}
