/// 函数式解法，运用到了
/// `iter`
/// `zip`
/// `skip`
/// `for_each`
/// `last`
pub fn run(s: String) -> i32 {
    fn roman_to_int_char(c: char) -> Option<i32> {
        match c {
            'I' => Some(1),
            'V' => Some(5),
            'X' => Some(10),
            'L' => Some(50),
            'C' => Some(100),
            'D' => Some(500),
            'M' => Some(1000),
            _ => None,
        }
    }

    let mut v = 0i32;
    if s.is_empty() {
        return 0;
    }

    s.chars()
        .zip(s.chars().skip(1))
        .for_each(|(first, second)| {
            let a = roman_to_int_char(first).unwrap();
            let b = roman_to_int_char(second).unwrap();
            v += if a < b { -1 * a } else { a };
        });
    v += roman_to_int_char(s.chars().last().unwrap()).unwrap();

    v
}

use std::collections::HashMap;
/// 通用解法思路 推荐
/// 1. 构建一个hashmap 存储所有的罗马字符与数字的映射
/// 2. 遍历字符串一次，遇到特殊的几个字符，要多考察下一个字符
/// 3. 所有结果相加
/// `std::collections::HashMap`
pub fn run2(s: String) -> i32 {
    // hashmap
    let mut map: HashMap<char, i32> = HashMap::new();
    map.insert('I', 1);
    map.insert('V', 5);
    map.insert('X', 10);
    map.insert('L', 50);
    map.insert('C', 100);
    map.insert('D', 500);
    map.insert('M', 1000);
    
    let mut sum: i32 = 0;
    let mut last: i32 = 0;
    
    // 闭包
    s.chars().for_each(|c| {
      let v = map.get(&c).unwrap();
      // 闭包可以获取外部函数的值 比如这个&last
      if v > &last {
        sum -= 2 * last;
      }
      
      // 解引用
      last = *v;
      sum += *v;
    });
    sum
  }
  
  pub fn mine(s: String) -> i32 {
    let mut map: HashMap<char, i32> = HashMap::new();
    map.insert('I', 1);
    map.insert('V', 5);
    map.insert('X', 10);
    map.insert('L', 50);
    map.insert('C', 100);
    map.insert('D', 500);
    map.insert('M', 1000);

    let mut last = 0i32;
    let mut res = 0i32;

    s.chars().for_each(|c| {
      let val = map.get(&c).unwrap();
      // 比如IV
      // 先加了1。但是到V发现比前一个大，则应该减去两倍上一次的值才是真实值
      if val > &last {
        res -= last * 2;
      }
      last = *val;
      res += val;
    });

    res
}

/// 另一种思路，也是函数式
/// 利用了enumerate特性
/// 本质上和run是一样的，可以学习一下语法
pub fn run3(s: String) -> i32 {
  let mut res = 0;
  for (i, ch) in s.chars().enumerate() {
      let num = ch_to_int(ch);
      if i == s.len() - 1 || num >= ch_to_int(s.chars().nth(i + 1).unwrap()) {
          res += num;
      } else {
          res -= num;
      }
  }
  res
}

fn ch_to_int(ch: char) -> i32 {
  match ch {
      'I' => 1,
      'V' => 5,
      'X' => 10,
      'L' => 50,
      'C' => 100,
      'D' => 500,
      'M' => 1000,
      _ => unreachable!(),
  }
}

#[cfg(test)]
mod tests {
    use crate::roman_to_int::run;
    use crate::roman_to_int::run2;
    use crate::roman_to_int::run3;
    use crate::roman_to_int::mine;

    #[test]
    fn roman_to_int_test_run() {
        // MCMXCIV
        // CMXCIV
        let res = run(String::from("MCMXCIV"));
        assert_eq!(res, 1994);
    }
    #[test]
    fn roman_to_int_test_run2() {
        // MCMXCIV
        // CMXCIV
        let res = run2(String::from("MCMXCIV"));
        assert_eq!(res, 1994);
    }
    #[test]
    fn roman_to_int_test_run3() {
        // MCMXCIV
        // CMXCIV
        let res = run3(String::from("MCMXCIV"));
        assert_eq!(res, 1994);
    }

    #[test]
    fn roman_to_int_test_mine() {
        // MCMXCIV
        // CMXCIV
        let res = mine(String::from("MCMXCIV"));
        assert_eq!(res, 1994);
    }
}
