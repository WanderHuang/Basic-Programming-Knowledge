pub fn run(dividend: i32, divisor: i32) -> i32 {
    let max = 2147483647;
    let min = -2147483648;
    if dividend == min && divisor == -1 {
        return max;
    }
    let diff = (dividend < 0 && divisor > 0) || (dividend > 0 && divisor < 0);
    // 全转为负数
    let mut dividend = -dividend.abs();
    let divisor = -divisor.abs();

    let mut count = 0;

    // 负数反过来
    while dividend <= divisor {
        let mut tick = -1;
        let mut div = divisor;
        // 累加
        loop {
            // 倍数处理，加快进程
            if div > min / 2 && div + div > min / 2 && dividend <= div + div {
                div = div + div;
                tick = tick + tick;
            } else {
                // 扣除
                dividend -= div;
                break;
            }
        }
        count += tick;
    }

    if diff {
        count
    } else {
        -count
    }
}

#[cfg(test)]
mod tests {
    use crate::divide;
    #[test]
    fn test_divide() {
        assert_eq!(3, divide::run(10, 3));
        assert_eq!(-2, divide::run(7, -3));
        // assert_eq!(2147483647, divide::run(-2147483648, -1));
    }
}
