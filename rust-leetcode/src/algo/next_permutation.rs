// 下一个字典序的数字，其实就是找到组合数中比当前数字大的最小的那个数
// 很明显交换的两个数字越靠近右边界越好
// 那么就应该从尾部开始遍历
// 1. slice的rev()方法可以实现从尾部开始遍历
// 2. [2, 1, 7, 9, 3]中3可以和1交换，产生一个比21793大的数字(23791)，9也可以和7交换产生一个比21793大的数字(21973)
// 3. 因此应该找两个变量[i, j]。i表示左边索引，j表示右边索引
// 4. 同时还应该保证所有满足条件的集合中i最大
pub fn run(nums: &mut Vec<i32>) {
  let len = nums.len();
  if len < 1 {
    return;
  }
  if len == 2 {
    nums.swap(0, 1);
    return;
  }

  // 需要记录两个点
  // 1. 当前数组最小值出现的位置
  // 2. 交换位置
  // 3. 该位置开始的子数组自排序
  // 4. 继续尝试1.类似递归
  let mut lowest = 0;
  let mut pivot = -1;

  // 双指针
  // 后一个数
  for i in (1..len).rev() {
    // 前一个数
    for j in (0..i).rev() {
      // 需要交换的位置
      if nums[i] > nums[j] {
        // 最靠近右边界的交换
        if j as i32 > pivot {
          pivot = j as i32;
          lowest = i;
        }
      }
    }
    println!("=> {} ; {}", lowest, pivot);
  }
  if pivot > -1 {
    nums.swap(lowest, pivot as usize);
    nums[pivot as usize + 1..].sort();
  } else {
    nums.sort_unstable();
  }
}

#[cfg(test)]
mod tests {
  use crate::next_permutation;

  #[test]
  fn test_next_permutation() {
    let mut vec = [2, 1, 7, 9, 3].to_vec();

    next_permutation::run(&mut vec);

    println!("res: {:?}", vec);
  }
}