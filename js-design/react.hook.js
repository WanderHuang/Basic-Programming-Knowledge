// react hooks的魔法 - 不是魔法 只是数组而已
// ! 为什么不能在条件和循环中使用hooks - 每次渲染的条件都有变化，可能造成cursor不准(每个setter设置的不是自己的state，设置到别人那里)
// ! 老法师介绍这不是魔法

let cursor = 0; 		// 第几次调用useState，维护每次调用的位置，get和set都通过cursor从调用位置读取
let getters = []; 		// get 
let setters = []; 		// set 
let isFirst = []; 		// 初始化数组 

function useState(initial) {
	let first = isFirst[cursor];
	first = first === undefined ? true : first
	if (first) {
		getters.push(initial);
		setters.push(createSetter(cursor));
		isFirst = false;
	}

	const setter = setters[cursor];
	const value = getters[cursor];

	// 返回当前快照并更新指针到下一个区域
	cursor++;
	return [value, setter];
}

// 闭包，得到初始化时的cursor
function createSetter(cursor) {
	return function setterWithCursor(newVal) {
		getters[cursor] = newVal;
	};
}


// 在组件内使用hooks-useState
function RenderFunctionComponent() {
	const [firstName, setFirstName] = useState("Rudi"); // cursor: 0
	const [lastName, setLastName] = useState("Yardley"); // cursor: 1

	return (
		<div>
			<Button onClick={() => setFirstName("Richard")}>Richard</Button>
			<Button onClick={() => setFirstName("Fred")}>Fred</Button>
		</div>
	);
}

// react生命周期模拟
function MyComponent() {
	cursor = 0; // 重置指针
	return <RenderFunctionComponent />; // 渲染
}

console.log(getters); 		// Pre-render: []
MyComponent();
console.log(getters); 		// First-render: ['Rudi', 'Yardley']
MyComponent(); 				// 指针更新
console.log(getters);		// Subsequent-render: ['Rudi', 'Yardley']

// 点击'Fred'
// setFirstName得到的cursor=0，更新了getters[0]，同时触发组件刷新，curor重置
// const [firstName, setFirstName] = useState("Rudi"); // cursor: 0 firstName: Fred
console.log(getters); // After-click: ['Fred', 'Yardley']
