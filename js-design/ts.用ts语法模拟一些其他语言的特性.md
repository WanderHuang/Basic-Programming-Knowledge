# 使用 ts 模拟其他语言的特性

最近在学习的两个语言(`rust` | `haskell`)，都有对元组和模式匹配的支持，让我们来尝试使用`ts`语言模拟一下，让`ts`里面也可以使用这种特性

## 元组

元组可以让我们使用更灵活简便的语法创建一个存放多个数据的容器，比起数组和向量，更小巧一些。

他有如下特性

1. 是一个容器
2. 容器大小在创建的时候确定
3. 容器类型在创建的时候确定
4. 容器内可以存放不同的数据类型

由于`js`语言自带的数组类型是可以存放不同数据类型的，如`let arr = [1, "", {}]`，我们在使用`ts`实现它的时候就只需要实现对应的类型就行了

```typescript
type Tuple1<A> = [A];
type Tuple2<A, B> = [A, B];
type Tuple3<A, B, C> = [A, B, C];
type Tuple4<A, B, C, D> = [A, B, C, D];
type Tuple5<A, B, C, D, E> = [A, B, C, D, E];

let tuple1: Tuple1<number> = [1];
let tuple2: Tuple2<number, string> = [1, ""];
let tuple3: Tuple3<number, string, object> = [1, "", {}];
let tuple4: Tuple4<number, string, object, Array<number>> = [1, "", {}, []];
let tuple5: Tuple5<number, string, Array<number>, Function, number> = [
  1,
  "",
  [],
  () => 1,
  1,
];

console.log(tuple1);
console.log(tuple2);
console.log(tuple3);
console.log(tuple4);
console.log(tuple5);
```

因为元组类型定义里面没有规定必须要固定大小为多少，因此理论上一个元组是无限的，但元组这个数据类型是为了更简便地处理不同的数据类型，因此我们一般实现 10 个以内的元组就行了。这里我实现了 5 个。

## match 语法

个人感觉 match 的模式匹配和元组组合起来会产生很大的使用效果(相比`switch...case`语句带来更多的匹配可能性)。

match 语法的特性

1. 按模式匹配的方法去找匹配数据
2. 支持元组类型的匹配，其实也就是符合上一个法则，模式匹配
3. 比`switch...case`更简洁的语法

```typescript
// 函数类型
type Func<P, R> = (x: P) => R;
// 通配符类型
type Each = "._.";
// 或
type Or<P, K> = P | K;
// 元组匹配、模式匹配特性
type MatchTuple =
  | Tuple2<any, any>
  | Tuple3<any, any, any>
  | Tuple4<any, any, any, any>
  | Tuple5<any, any, any, any, any>;
// ts/js模拟match特性
//
function match<P>(
  ...tuples: Tuple2<Or<P, Each> | MatchTuple, Func<P, void>>[]
) {
  // 返回一个用于预测的谓词函数
  return function predict(p: P) {
    for (let i = 0; i < tuples.length; i++) {
      let [rule, func] = tuples[i];
      // 通配符必须在末尾
      if (rule === match.Each && i !== tuples.length - 1) {
        throw new Error("You should put match.Each to the end of your tuples");
      }
      // 匹配通配符或数据类型
      if (rule === match.Each || rule === p) {
        func(p);
      }
      // 模式匹配
      if (rule instanceof Array && p instanceof Array) {
        let success = true;
        for (let j = 0; j < rule.length; j++) {
          // 一个模式中出现不匹配的数据，则整个模式失败
          if (rule[j] !== match.Each && rule[j] !== p[j]) {
            success = false;
            break;
          }
          // 通配符跳过
          if (rule[j] === match.Each) {
            continue;
          }
        }

        // 一个模式匹配成功，调用处理器
        if (success) {
          func(p);
        }
      }
    }
  };
}

// 定义通配符
match.Each = "._." as Each;

// 分开使用
let predictTrue: Tuple2<boolean, Func<boolean, void>> = [true, console.log];
let predictFalse: Tuple2<boolean, Func<boolean, void>> = [false, console.log];
let matchBoolean = match<boolean>(predictTrue, predictFalse);
matchBoolean(true);
matchBoolean(false);

// 一起使用
match(
  [0, console.log],
  [1, console.log],
  [2, console.log],
  [3, console.log],
  [match.Each, (p) => console.log(p, match.Each)] // 通配符
)(1);

// 复杂匹配
match(
  [["complex", 1, 2], console.log],
  [["complex", 3, 4], console.log],
  [["complex", 5, 6], console.log],
  [[], console.log],
  [match.Each, () => console.log("complex all")]
)(["complex", 3, 4]);
```

## 后记

前端程序员有一个弱势，因为`js`语法太松散灵活了，让我们对一些基础和传统的计算机语言特性理解起来比较吃力。在学习`rust`和`haskell`后，了解了更多的计算机语法，以及为什么这么设计，就有了一个更全面的认识。其实语法只是片面的知识，我们应该更深入地去理解为什么我们需要这么去表达一个计算过程。

另外，`rust`很多概念是承袭的`haskell`的，有点酒瓶装新酒的意思，站在巨人的肩膀上，就算只是抬一下脚，也是更接近星空的位置。做学习和工作也是，日拱一卒，要相信量变的力量。
