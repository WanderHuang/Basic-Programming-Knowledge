/// 最长回文子串
///
/// 动态规划算法
///
/// 转移公式：dp[l][r] = dp[l + 1][r - 1] ? s[l] == s[r] : false
///
/// 转移公式有个约束，r - l + 1 <= 3的话，其实就是只有两个元素，那么直接返回s[l] == s[r]
///
/// 说明:
///
/// 一个字符串的头尾相等，那么他是否是子串由他去掉头尾之后是否是回文串决定
pub fn run(s: String) -> String {
    let len_s = s.len();
    if len_s < 2 {
        return s;
    }
    // 创建二维数组
    let mut dp: Vec<Vec<bool>> = vec![vec![false; len_s]; len_s];
    // 获取char数组 b'a' u8
    let s = s.as_bytes();
    let mut ret_s = String::from_utf8(vec![s[0]]).unwrap();
    // 二维数组值更新
    for r in 1..len_s {
        for l in 0..r {
            if s[l] == s[r] && (r - l + 1 <= 3 || dp[l + 1][r - 1]) {
                dp[l][r] = true;
                if r - l + 1 > ret_s.len() {
                    // 获取切片
                    ret_s = String::from_utf8(s[l..r + 1].to_vec()).unwrap();
                }
            }
        }
    }
    ret_s
}

#[cfg(test)]
mod tests {
    use crate::longest_palindromic_substring;

    #[test]
    fn test_next_permutation() {
        let res = longest_palindromic_substring::run(String::from("abcaacacb"));

        assert_eq!(res, String::from("caac"))
    }
}
