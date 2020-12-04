pub fn run(n: i32) -> String {
    if n == 0 {
        return String::from("0");
    }
    let separator = ".";

    let mut n = n;

    let mut res = String::from("");

    loop {
        if n == 0 {
            break;
        }

        let div_res = n % 1000;

        if res.len() > 0 {
            res.insert_str(0, separator);
        }

        let mut div_res_str = div_res.to_string();

        loop {
            if div_res_str.len() == 3 {
                break;
            }

            div_res_str.insert_str(0, "0");
        }

        res.insert_str(0, &div_res_str);

        n = n / 1000;
    }

    loop {
        if res.starts_with("0") {
            res.remove(0);
        } else {
            break;
        }
    }

    res
}

#[cfg(test)]
mod tests {

    use crate::thousand_separator;

    #[test]
    fn test() {
        assert_eq!(thousand_separator::run(10001), "10.001")
    }
}

#[allow(dead_code)]
mod standard_solution {

    struct Solution {}

    impl Solution {
        pub fn thousand_separator(n: i32) -> String {
            if n == 0 {
                return "0".to_string();
            }
            let mut n = n;
            let mut i = 0;
            let mut ans = String::new();
            // 挨个读取
            while n > 0 {
                if i % 3 == 0 && i > 0 {
                    ans.push('.');
                }
                ans.push(('0' as u8 + (n % 10) as u8) as char);
                n /= 10;
                i += 1;
            }

            // 字符串反转
            return ans.chars().into_iter().rev().collect();
        }
    }
}
