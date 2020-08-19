/// 计算数组字符串的最大公共头
/// 比如["flower", "flu", "flat"] => "fl"
/// 思路
/// 1. 拿到长度最小的字符串
/// 2. 从该字符串开始，逐步缩小子串
/// 3. 任意一个子串满足条件则返回值
/// 效率(LeetCode)
/// Time: 0ms
/// Zone: 2.1MB
pub fn run (strs: Vec<String>) -> String {
  // "" 类型为&str，持有字符串，因此要转到String
  if strs.len() == 0 {
    return String::from("")
  }
  // mut 可变引用
  // to_vec 转为向量
  // to_owned 获取引用
  let mut strs = strs.to_vec().to_owned();
  // |x, y| 这一块属于闭包。闭包表示持有外部变量引用的一块内存区域
  // cmp 对比大小
  strs.sort_by(|x, y| x.len().cmp(&y.len()));
  
  // first 向量的头数据
  let mut first = strs.first().unwrap().to_owned();
  // let mut len = first.len();

  // loop循环体
  loop {
    // let seg = first.get_unchecked(0..len);
    let mut is_start = true;
    // for循环体 不用加括号
    for i in 1..strs.len() {
      // 借用 获取引用
      let curr = &strs[i];
      if !curr.starts_with(&first) {
        is_start = false;
        break;
      }
    }

    // if语句 if语句可以有返回值，因此要显式声明返回
    if is_start {
      return first.to_string();
    }

    // get 获取一段子字符串
    // unwrap 从Option/Result中提取Some/Ok
    first = first.get(0..first.len() - 1).unwrap().to_string();

    if first.len() == 0 {
      break;
    }
  }

  "".to_string()
}

// 测试
#[cfg(test)]
mod tests {
  // mod 内可以使用use语法
  use crate::longest_common_prefix::run;

  // 单个测试
  #[test]
  fn test () {
    let mut strs: Vec<String> = Vec::new();
    strs.push("flow".to_string());
    strs.push("eflat".to_string());
    strs.push("follow".to_string());

    let res = run(strs);
    println!("[longest_common_prefix] common: {}", res);
  }
}