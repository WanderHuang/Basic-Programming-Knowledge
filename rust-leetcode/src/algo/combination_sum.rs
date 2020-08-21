/// 从给定数组中找出能组成target的所有组合，数字可以重复使用
/// 思路
/// 1. 深度优先遍历
/// 2. 每次减少target的值(current_target)
/// 3. current_target为0时的栈即和为target的数组组合
/// 4. current_target大于0时，不断减少
/// 5. current_target小于0时，终止搜索，舍弃该stack
/// 效率比较差: 使用了很多临时空间，以及push pop clone等操作
/// 4 ms 52%
/// 2.1MB 80%
pub struct Solution {}

use std::collections::{VecDeque};
impl Solution {
  // Vec<Vec<i32>> 相当于是一个二维数组。但是rust内叫做向量，可以叫做二维向量
  pub fn combination_sum(candidates: Vec<i32>, target: i32) -> Vec<Vec<i32>> {
    // Vec::new 创建向量
    let mut res = Vec::new();
    // Self::dfs 获取当前结构体下的dfs方法
    Self::dfs(target, &mut Vec::new(), &candidates, &mut res);
  
    return res;
  }
  
  fn dfs(current_target: i32, stack: &mut Vec<i32>, candidates: &Vec<i32>, res: &mut Vec<Vec<i32>>) {
    if current_target < 0 {
      return
    }
    if current_target == 0 {
      // clone操作一般比较耗时，尽量少用
      if res.contains(&stack) {
        return
      }
      res.push(stack.to_vec());
    } else {
      let len = stack.len();
      // if语句可以返回值
      let last = if len == 0 {-1} else { stack[stack.len() - 1] };
      // 递归深度遍历
      for &x in candidates {
        if x >= last {
          stack.push(x);
          Self::dfs(current_target - x, stack, candidates, res);
          stack.pop();
        }
      }
    }
  }

  /// 优秀思路 - 时间为0ms
  /// 广度优先算法
  pub fn combination_sum_2(candidates: Vec<i32>, target: i32) -> Vec<Vec<i32>> {
    let mut candidates = candidates;
    // 入参排序
    candidates.sort();
    let min_n = candidates[0];
    // vec! 是宏函数，生成向量
    let  mut ans: Vec<Vec<i32>> = vec![];
    // VecDeque 向量Vec实现的双向队列
    let mut vd: VecDeque<(Vec<i32>, i32)> = VecDeque::new();
    // 头部插入
    vd.push_back((vec![], 0));
    // 队列非空
    while !vd.is_empty() {
        let ind = 0;
        // 读取队列
        for _ in 0..vd.len() {
            // 头部读取
            if let Some((v, n)) = vd.pop_front() {
                // rust内if是语句，可以有返回值
                // 获取最后的一个
                let last_num = if v.len() == 0 {0} else {v[v.len() - 1]};
                // 后续的数字
                // [index..] 获取slice，没有后面的值默认为从index到最后
                for j in &candidates[ind..] {
                    if ind > 0 && candidates[ind]==candidates[ind-1] {
                        continue;
                    }
                    // * 解引用
                    if *j >= last_num {
                        if *j + n == target {
                            let mut v2 = v.clone();
                            v2.push(*j);
                            ans.push(v2);
                        }else if (*j + n + min_n) <= target {
                            let mut v2 = v.clone();
                            v2.push(*j);
                            vd.push_back((v2, *j + n));
                        }
                    }
                }
            }
        }
    }
    
    return ans;
  }
}

#[cfg(test)]
mod tests {
  use crate::combination_sum;
  #[test]
  fn combination_sum_test() {
    let res = combination_sum::Solution::combination_sum([2,3,6,7].to_vec(), 7);
    let mut test = Vec::new();
    let mut a = Vec::new();
    a.push(7);
    let mut b = Vec::new();
    b.push(2);
    b.push(2);
    b.push(3);

    test.push(b);
    test.push(a);
    assert_eq!(res, test);
  }
}