// ====================================
// =========== Promise的实现 ===========
// ====================================
// 核心要点
// 1. 异步。原生js提供的异步能力也就那么两个比较重要：基于闭包的延迟执行(回调)，基于时钟的API(setTimeout)
// 2. 闭包。通过闭包，把一个函数的值引入另外的函数；甚至由于函数也是一个值，可以延迟函数的执行。
// 3. 原型。我们要遵循鸭子模型，第一步是让自己的API和他像，第二步就是让原型能够共通。特别是Promise是一种新的数据类型，因此需要加入很多类型判断。
// ====================================
function MakeAPromise(fn) {
  this.data = undefined;
  this.error = undefined;

  this.resolveCallbacks = [];
  this.rejectCallbacks = [];

  this.status = 'pending';

  function resolve(data) {
    if (this.status === 'pending') {
      this.status = 'resolved';
      this.data = data;

      // 下一个时钟
      setTimeout(() => {
        this.resolveCallbacks.forEach((call) => call(data));
      }, 0);
    }
  }

  function reject(error) {
    if (this.status === 'pending') {
      this.error = error;
      this.status = 'rejected';

      // 下一个时钟
      setTimeout(() => {
        this.rejectCallbacks.forEach((call) => call(error));
      }, 0);
    }
  }

  try {
    fn(resolve.bind(this), reject.bind(this));
  } catch (error) {
    reject.call(this, error);
  }
}

// 核心函数
// 两个参数可以往任意地方传递，以实现异步编程
MakeAPromise.prototype.then = function (resolve, reject) {
  let onResolve = typeof resolve === 'function' ? resolve : (v) => v;
  let onReject = typeof reject === 'function' ? reject : (v) => v;

  // then调用时状态不一定是resoled。因此要分类讨论


  if (this.status === 'resolved') {
    // 链式调用
    return new MakeAPromise((res, rej) => {
      setTimeout(() => {
        try {
          let result = onResolve(this.data);

          if (result instanceof Promise || result instanceof MakeAPromise) {
            // 透传、链式调用
            result.then(res, rej);
          } else {
            res(result);
          }
        } catch (error) {
          rej(error);
        }
      }, 0);
    });
  }

  if (this.status === 'rejected') {
    return new MakeAPromise((res, rej) => {
      setTimeout(() => {
        try {
          let result = onReject(this.error);
          if (result instanceof Promise || result instanceof MakeAPromise) {
            result.then(res, rej);
          } else {
            rej(result);
          }
        } catch (error) {
          rej(error);
        }
      }, 0);
    });
  }

  if (this.status === 'pending') {
    // 返回一个承诺
    return new MakeAPromise((res, rej) => {
      // 承诺搜集、延迟调用
      this.resolveCallbacks.push((data) => {
        // 下一个时钟
        setTimeout(() => {
          let result;
          try {
            result = onResolve(data);
            if (result instanceof Promise || result instanceof MakeAPromise) {
              result.then(res, rej);
            } else {
              res(result);
            }
          } catch (error) {
            rej(error);
          }
        }, 0);
      });

      // 承诺搜集、延迟调用
      this.resolveCallbacks.push((error) => {
        // 下一个时钟
        setTimeout(() => {
          let result;
          try {
            result = onReject(this.error);

            if (result instanceof Promise || result instanceof MakeAPromise) {
              result.then(res, rej);
            } else {
              rej(result);
            }
          } catch (error) {
            rej(error);
          }
        }, 0);
      });
    });
  }
};

MakeAPromise.prototype.catch = function (fn) {
  return this.then(null, fn);
};

MakeAPromise.resolve = function (data) {
  return new MakeAPromise((resolve) => resolve(data));
};

MakeAPromise.reject = function (error) {
  return new MakeAPromise((_, reject) => reject(error));
};

MakeAPromise.all = function (arr) {
  return new MakeAPromise((resolve, reject) => {
    if (
      arr instanceof Array ||
      arr.find((a) => !(a instanceof MakeAPromise || a instanceof Promise))
    ) {
      let result = [];
      let len = arr.length;
      arr.forEach((p) => {
        p.then(
          (data) => {
            result.push(data);
            if (result.length === len) {
              resolve(result)
            }
          },
          (error) => reject(error)
        );
      });
    } else {
      reject('MakeAPromise.all should apply to MakeAPromise Instance Array');
    }
  });
};

// 标准 测试

let p = new Promise((resolve, reject) => {
  setTimeout(() => resolve(1), 1000);
});

p.then(console.log);
p.then(console.log);

// API测试

let p2 = new MakeAPromise((resolve, reject) => {
  setTimeout(() => resolve(2), 2000);
});

p2.then(console.log);
p2.then(console.log);

Promise.resolve('xxx').then(console.log);


let a = new Promise((resolve) => {
  setTimeout(() => {
    resolve(7)
  }, 1000)
})
let b = new Promise((resolve) => {
  setTimeout(() => {
    resolve(4)
  }, 2000)
})

let c = new Promise((resolve) => {
  setTimeout(() => {
    resolve(1)
  }, 800)
})

// [1, 7, 4]
MakeAPromise.all([a, b, c]).then(console.log)
