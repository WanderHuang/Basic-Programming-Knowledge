function solveSuduku(board) {
  // 行、列、3*3
  let row = new Array(9).fill(0).map(() => new Array(9).fill(0));
  let col = new Array(9).fill(0).map(() => new Array(9).fill(0));
  let box = new Array(9).fill(0).map(() => new Array(9).fill(0));

	
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      if (board[i][j] !== ".") {
        let num = Number(board[i][j]) - 1;
        row[i][num] = 1;
        col[j][num] = 1;
        box[Math.floor(i / 3) * 3 + Math.floor(j / 3)][num] = 1;
      }
    }
  }

  print(row);
  console.log();
  print(col);
  console.log();
  print(box);

  // 遍历所有进行填值
  function dfs(i, j) {
    if (j === 9) {
      i++;
      j = 0;
      if (i === 9) {
        return true;
      }
    }
    if (board[i][j] === ".") {
      for (let num = 0; num <= 8; num++) {
        let index = (num + 1).toString();
        let filled =
          row[i][num] ||
          col[j][num] ||
          box[Math.floor(i / 3) * 3 + Math.floor(j / 3)][num];
        // 没有被填写过
        if (!filled) {
          row[i][num] = 1;
          col[j][num] = 1;
          box[Math.floor(i / 3) * 3 + Math.floor(j / 3)][num] = 1;

          board[i][j] = index;

          if (dfs(i, j + 1)) {
            return true;
          }

          row[i][num] = 0;
          col[j][num] = 0;
          box[Math.floor(i / 3) * 3 + Math.floor(j / 3)][num] = 0;

          board[i][j] = ".";
        }
      }
    } else {
      return dfs(i, j + 1);
    }
    return false;
  }

  dfs(0, 0);
}

function print(arr) {
  console.log();
  arr.forEach((row) => {
    let s = row.reduce((prev, curr) => {
      return prev + curr + "_";
    }, "");

    console.log(s);
  });

  console.log();
}

let board = [
  ["5", "3", ".", ".", "7", ".", ".", ".", "."],
  ["6", ".", ".", "1", "9", "5", ".", ".", "."],
  [".", "9", "8", ".", ".", ".", ".", "6", "."],
  ["8", ".", ".", ".", "6", ".", ".", ".", "3"],
  ["4", ".", ".", "8", ".", "3", ".", ".", "1"],
  ["7", ".", ".", ".", "2", ".", ".", ".", "6"],
  [".", "6", ".", ".", ".", ".", "2", "8", "."],
  [".", ".", ".", "4", "1", "9", ".", ".", "5"],
  [".", ".", ".", ".", "8", ".", ".", "7", "9"],
];

print(board);

solveSuduku(board);

print(board);
