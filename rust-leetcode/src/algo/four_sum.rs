// 找出和为target的四个数
// <常规解法>
pub fn run(nums: Vec<i32>, target: i32) -> Vec<Vec<i32>> {
    let mut res: Vec<Vec<i32>> = Vec::new();
    for a in 0..nums.len() {
      for b in (a + 1)..nums.len() {
        for c in (b + 1)..nums.len() {
          for d in (c + 1)..nums.len() {
            if nums[a] + nums[b] + nums[c] + nums[d] == target {
              let mut row = Vec::new();
              row.push(nums[a]);
              row.push(nums[b]);
              row.push(nums[c]);
              row.push(nums[d]);

              row.sort_unstable();

              if !res.contains(&row) {
                res.push(row);
              }
            }
          }
        }
      }
    }

    res
}


// 双指针方案
// 1. nums先排序一次
// 2. 头四个与target比较，如果比target还大，则返回 []
// 3. 后四个与target比较，如果比target还小，则返回 []
// 4. 双指针遍历
pub fn run2(arr: Vec<i32>, target: i32) -> Vec<Vec<i32>> {
    let mut res = Vec::new();
    let len = arr.len();
    if len < 4 { return res }
    let mut nums = arr.to_vec();
    nums.sort_unstable();

    let min = nums[0] + nums[1] + nums[2] + nums[3];
    if target < min { return res }
    let max = nums[len - 1] + nums[len - 2] + nums[len - 3] + nums[len - 4];
    if target > max { return res }

    // 外层循环，判定方案和上面类似
    for i in 0..len - 3 {
        let a = nums[i];
        if i != 0 && nums[i - 1] == a { continue }

        let min = a + nums[i + 1] + nums[i + 2] + nums[i + 3];
        if target < min { break }
        let max = a + nums[len - 1] + nums[len - 2] + nums[len - 3];
        if target > max { continue }

        // 内层循环
        for j in i + 1..len - 2 {
            let b = nums[j];
            if j != i + 1 && nums[j - 1] == b { continue }
            // 左右指针 left指向最小值，right指向最大值
            let (mut l, mut r) = (j + 1, len - 1);

            let min = a + b + nums[l] + nums[l + 1];
            if target < min { break }
            let max = a + b + nums[r] + nums[r - 1];
            if target > max { continue }

            // 指针包夹
            while l < r {
                let (c, d) = (nums[l], nums[r]);
                let sum = a + b + c + d;
                let diff = sum - target;
                if diff == 0 {
                    res.push(vec![a, b, c, d]);
                    while l < r && nums[l] == nums[l + 1] { l += 1 }
                    while l < r && nums[r] == nums[r - 1] { r -= 1 }
                    l += 1;
                    r -= 1;
                } else if diff > 0 {
                    r -= 1;
                } else {
                    l += 1;
                }
            }
        }
    }
    res
}

#[cfg(test)]
mod tests {
  use crate::four_sum;
  #[test]
  fn test_four_sum () {
    let mut vc = Vec::new();
    vc.push(1);
    vc.push(0);
    vc.push(-1);
    vc.push(0);
    vc.push(-2);
    vc.push(2);

    let mut res = Vec::new();
    res.push(Vec::from([-2, -1, 1, 2]));
    res.push(Vec::from([-2,  0, 0, 2]));
    res.push(Vec::from([-1,  0, 0, 1]));

    assert_eq!(res, four_sum::run2(vc, 0));

  }
}