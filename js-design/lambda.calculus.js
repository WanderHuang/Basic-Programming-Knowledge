// lambda演算：

// ## id函数
// 任意的数据都是函数

// λx.x
const id = x => x;

// ## 逻辑运算
// 用函数（演算式）表示逻辑基本量，并通过归约得到更多的操作符
// true/false -> not or and

// λx.λy.x
const True = x => y => x;
// λx.λy.y
const False = x => y => y;

// λb.b False True
const Not = b => b(False)(True);

console.log(Not(True)); // False
console.log(Not(False)); // True

// λb1.λb2.b1 b2 b1
const And = b1 => b2 => b1(b2)(b1);
// λb1.λb2.b1 b1 b2
const Or = b1 => b2 => b1(b1)(b2);

console.log(And(True)(False)); // False
console.log(And(True)(True)); // True
console.log(And(False)(True)); // False
console.log(And(False)(False)); // False

console.log(Or(True)(False)); // True
console.log(Or(True)(True)); // True
console.log(Or(False)(True)); // True
console.log(Or(False)(False)); // False


// ## 条件运算
// 用函数表示条件运算

// λb.λl.λr.b l r
const Either = b => left => right => b(right)(left);

const Left = x => console.log('error:', x);
const Right = x => console.log('success:', x);

console.log(Either(True)(Left)(Right)); // Left
console.log(Either(False)(Left)(Right)); // Right

// ## 计算
// 用自然数表示方法推导所有的数据
// 元 + 操作

const Zero = f => x => x;
const One = f => x => f(x);

// const N = f => x => f...f(x)