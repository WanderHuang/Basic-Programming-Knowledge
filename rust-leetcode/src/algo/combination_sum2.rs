// 💔超时
pub fn run(candidates: Vec<i32>, target: i32) -> Vec<Vec<i32>> {
  let mut result = Vec::new();
  let len = candidates.len();


  fn walk(candidates: &Vec<i32>, start: i32, end: i32, queue: &mut Vec<i32>, target: i32, result: &mut Vec<Vec<i32>>) -> bool {

      for x in start..end {
      let cur = candidates.get(x as usize).unwrap();
      if !queue.contains(&x) {
          queue.push(x);
          if target == *cur {
          push(queue, result, candidates);
          queue.pop();
          } else {
          let mut next_target = target;
          if target > *cur {
              next_target = target - *cur
          } else {
              queue.pop();
          }
          walk(candidates, start + 1, end, queue, next_target, result);
          if target > *cur {
              queue.pop();
          }
          }
      }
      }


      fn push(queue: &mut Vec<i32>, result: &mut Vec<Vec<i32>>, candidates: &Vec<i32>) {
      let mut res = Vec::new();
      for x in queue.to_vec() {
          res.push(*candidates.get(x as usize).unwrap());
      }
      res.sort();
      if !result.contains(&res) {
          result.push(res.to_vec());
      }
      }


      return false;

  }

  walk(&candidates, 0, len as i32, &mut Vec::new(), target, &mut result);

  result
}


#[cfg(test)]
mod tests {
  use crate::combination_sum2;

  #[test]
  fn test_combination_sum2() {
    let res = combination_sum2::run([10, 1, 2, 7, 6, 1, 5].to_vec(), 8);
    for x in res {
      println!("{:?}", x);
    }
  }
}
