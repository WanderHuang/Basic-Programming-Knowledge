///
/// 旋转一个N * N的矩阵，顺时针90度
///
/// 1  2  3  4       13 9  5 1
/// 5  6  7  8    => 14 10 6 2
/// 9  10 11 12      15 11 7 3
/// 13 14 15 16      16 12 8 4
///
/// 原地旋转
/// 方法一：
/// 对角线反转
/// 中轴线反转
/// 方法二：
/// 分别转动一圈数字
pub fn run(matrix: &mut Vec<Vec<i32>>) {
    let len = matrix.len();
    let mut exchange  = |a: (usize, usize), b: (usize, usize)| {
      let temp = matrix[a.0][a.1];
      matrix[a.0][a.1] = matrix[b.0][b.1];
      matrix[b.0][b.1] = temp;
    };
    for i in 0..len {
        for j in i + 1..len {
          exchange((i, j), (j, i));
        }
    }

    for i in 0..len {
      for j in 0..(len / 2) {
        exchange((i, j), (i, len - j - 1));
      }
    }
}

/// 旋转每一圈数字
pub fn run2(matrix: &mut Vec<Vec<i32>>) {
  let len = matrix.len();

  for i in 0..len/2 {
    for j in i..len - i - 1 {
      let temp = matrix[i][j];
      matrix[i][j] = matrix[len - j - 1][i];
      matrix[len - j - 1][i] = matrix[len - i - 1][len - j - 1];
      matrix[len - i - 1][len - j - 1] = matrix[j][len - i - 1];
      matrix[j][len - i - 1] = temp;
    }
  }

}

#[cfg(test)]
mod tests {
  use crate::rotate;
  #[test]
  fn test() {
    let mut matrix = vec![vec![0; 4]; 4];

    let mut num = 1;
    for i in 0..4 {
      for j in 0..4 {
        matrix[i][j] = num;
        num += 1;
      }
    }
    // println!("Matrix IN\n{:?}", matrix);

    rotate::run2(&mut matrix);

    // println!("Matrix OUT\n{:?}", matrix);
  }
}
