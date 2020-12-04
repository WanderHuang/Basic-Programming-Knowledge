pub fn run(nums: Vec<i32>) -> i32 {
    let sum: i32 = nums.iter().sum();
    let mut l = 0;
    for i in 0..nums.len() {
        // r == l
        if sum - nums[i] - l == l {
            return i as i32;
        }
        l += nums[i];
    }

    -1
}

#[cfg(test)]
mod test {
    #[test]
    fn test() {
        use crate::pivot_index;

        let res = pivot_index::run(vec![1, 2, 3, 1, 1, 1]);

        assert_eq!(res, 2);

        let sum: i32 = vec![1, 2, 3, 1, 1, 1].iter().sum();
        assert_eq!(sum, 9)
    }
}
