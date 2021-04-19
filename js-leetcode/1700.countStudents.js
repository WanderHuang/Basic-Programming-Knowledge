var countStudents = function (students, sandwiches) {
  // 圆形三明治 0
  // 三角三明治 1
  // 三明治 [0, 1, 1, 1]
  // 学生 [0, 1, 1, 0, ...]
  // 栈顶元素被喜欢则拿走，否则学生放弃三明治并回到队列尾部
  // 直到队列里所以学生都不喜欢栈顶三明治
  // 返回无法吃三明治的学生数量

  let remain = new Array(2).fill(0);

  students.forEach((s) => remain[s]++);

  for (let i = 0; i < sandwiches.length; i++) {
    // 栈顶元素没有学生喜欢了，则无法被消费，此时返回没有拿到学生数量
    if (remain[sandwiches[i]] === 0) return remain[1 - sandwiches[i]];
    // 吃到汉堡
    remain[sandwiches[i]]--;
  }

  return 0;
};

countStudents([1, 1, 0, 0], [0, 1, 0, 1]);
