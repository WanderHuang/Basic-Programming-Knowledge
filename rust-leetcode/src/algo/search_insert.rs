/// 从排序数组中找到目标的序号，如果没有该目标，则返回应该出现的位置
/// 思路
/// 1. 如果数组长度在2以下，可以很快得到序号
/// 2. 每次从数组中取出两个数字
/// 3. 若第一个等于target，返回迭代次数
/// 4. 若target在两个数字之间，或者第二个数字等于target 返回第二个数字的序号，即迭代次数+1
/// 5. 若第一个数字就比target大，则返回迭代次数
/// 6. 迭代完毕都没有找到，则返回迭代次数+1(target太大，只能出现在末尾)
/// 
/// 效率(LeetCode)
/// Time: 0ms
/// Zone: 2.1M
pub fn run(nums: Vec<i32>, target: i32) -> i32 {
  if nums.len() == 0 {
    return 0;
  }
  if nums.len() == 1 {
    if nums[0] >= target {
      return 0;
    } else {
      return 1;
    }
  }
  // Vec的windows方法：得到一个迭代器，该迭代器的模式为窗口模式，窗口长度为N
  let mut ite = nums.windows(2);
  let mut count = 0;
  // iter.len() 迭代器剩余长度
  while ite.len() > 0 {
    // next() 返回Option类型，确保安全
    // Some(x) 有值
    // None() 没有值
    let val = ite.next().unwrap();
    if val[0] == target {
      return count;
    } else if (val[0] < target && val[1] > target) || val[1] == target {
      return count + 1;
    } else if val[0] > target {
      return count;
    }

    // rust没有自增操作符++
    count += 1;
  }

  return count + 1;
}

#[cfg(test)]
mod tests {
  use crate::search_insert;
  #[test]
  fn search_insert_test() {
    // &[i32]类型可以通过 to_vec()转换为Vec<i32>类型
    assert_eq!(search_insert::run([1, 2, 4, 5].to_vec(), 3), 2);
    assert_eq!(search_insert::run([1].to_vec(), 1), 0);
  }
}