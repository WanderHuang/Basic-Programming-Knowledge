// 实现异步任务编排

// 创建很多异步函数
function createFunc(i) {
	return function () {
		return new Promise((resolve) => {
			setTimeout(() => {
				resolve(i)
			}, Math.random() * 100 * i * 10)
		})
	}
}
const tasks = [];
for(let i = 0; i < 100; i ++) {
	tasks.push(createFunc(i + 1));
}

// 执行函数，所有执行完时这里有值
runTask(tasks)
	.then((final) => {
		console.log("[x] >>> ", final);
	})
	.catch(e => {
		console.error(e);
	});

// tasks为一个任务数组
// limit为并发任务数量
function runTask(tasks, limit = 10) {
	// TODO 这里需要检查参数是否合规
	let size = tasks.length;
	// 任务池
	let pool = [];
	// 有的函数就是没有返回值，因此用一个flags来表示是否执行完毕，比用返回值判断要好
	let flags = new Array(size).fill(false);
	// 最终返回值
	let result = new Array(size);
	// 当前运行的任务数量
	let counting = 0;
	// 任务状态
	const TaskStatus = {
		ready: 0,
		process: 1,
		finish: 2,
		reject: 9
	}
	// 所有任务入队
	for(let i = 0; i < size; i++) {
		if (tasks[i]) {
			const task = tasks[i];
			task.index = i;
			addTask(task, TaskStatus.ready);
		}
	}

	return new Promise((resolve, reject) => {
		// 定时清理finish的数据，避免内存膨胀
		let timer = setInterval(() => {
			cleanTask();
		}, 5000);

		// 任务执行器 递归执行
		executor(
			(x) => {
				clearInterval(timer);
				resolve(x);
			},
			(e) => {
				clearInterval(timer);
				reject(e);
			}
		);
		
	});

	// 往任务池内添加任务
	function addTask(task, status) {
		pool.push([task, status])

	}

	// 修改任务状态
	function setTask(index, status) {
		pool  = pool.map(([task, s]) => {
			if (task.index === index) {
				return [task, status]
			}
			return [task, s]
		});
	}

	// 清除完成任务
	function cleanTask() {
		pool = pool.filter(([_, status]) => status !== TaskStatus.finish);
	}
	
	// 执行器
	function executor(resolve, reject) {
		// 需要添加的任务数量
		let addition = limit - counting;
		let queue = pool.filter(([task, status]) => status === TaskStatus.ready).slice(0, addition);
		counting += addition;
		queue.forEach(([task, status]) => {
			// 修改为执行状态
			setTask(task.index, TaskStatus.process);
			task()
				.then(res => {
					// 更新状态量
					result[task.index] = res;
					flags[task.index] = true
					counting--;
					setTask(task.index, TaskStatus.finish);
					console.log("[x] > ", res, flags);
					// 所有都resolve之后，整体返回值
					if (flags.every(x => x)) {
						resolve(result);
					} else {
						// 运行其他的任务
						executor(resolve, reject);
					}
				})
				.catch((e) => {
					setTask(task.index, TaskStatus.reject);
					reject(e);
				});
		})
	}
}