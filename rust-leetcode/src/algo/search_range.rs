// 函数式编程
pub fn run(nums: Vec<i32>, target: i32) -> Vec<i32> {
    // 向量二分查询 Ok查到，Err没查到本应出现位置
    match nums.binary_search(&target) {
        Ok(x) => {
            let (mut i, mut j) = (x as i32, x as i32);
            // 截取a...x
            for &ele in nums.iter().take(x).rev() {
                if ele == target {
                    i -= 1;
                } else {
                    break;
                }
            }
            // 截取x..b
            for &ele in nums.iter().skip(x+1) {
                if ele == target {
                    j += 1;
                } else {
                    break;
                }
            }
            vec![i, j]
        },
        Err(_) => {
            vec![-1,-1]
        }
    }
}

#[cfg(test)]
mod tests {
    use crate::search_range;
    #[test]
    fn test_search_range() {
        let nums = [1].to_vec();
        let res = search_range::run(nums, 0);
        assert_eq!(res, [-1, -1]);
    }
}