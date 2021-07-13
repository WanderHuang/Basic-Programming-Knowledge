function stringify(obj) {
  return object2String(obj);

  // 内部递归
  function object2String(obj, str = "") {
    if (isPrimitive(obj, "string")) {
      str += string2String(obj);
    } else if (isPrimitive(obj, "boolean")) {
      str += boolean2String(obj);
    } else if (isPrimitive(obj, "number")) {
      str += obj;
    } else if (is(obj, "Object")) {
      str += "{";
      let cache = [];
      for (const [key, value] of Object.entries(obj)) {
        if (obj.hasOwnProperty(key)) {
          if (!is(value, "Function") && !is(value, "Undefined")) {
            let row = "";
            row += string2String(key);
            row += ":";
            row = object2String(value, row);
            cache.push(row);
          }
        }
      }
      if (cache.length) {
        str += cache.join(",");
      }
      str += "}";
    } else if (is(obj, "Array")) {
      str += array2String(obj);
    } else if (is(obj, "Null")) {
      str += "null";
    }

    return str;
  }

  function string2String(obj) {
    return `\"${obj}\"`;
  }

  function boolean2String(obj) {
    return String(obj);
  }

  function array2String(obj) {
    let res = "[";
    for (const [i, o] of obj.entries()) {
      if (!is(o, "Undefined")) {
        res = object2String(o, res);
      } else {
        res += "null";
      }
      if (i !== obj.length - 1) {
        res += ",";
      }
    }

    res += "]";

    return res;
  }

  // 帮助函数
  function is(obj, type) {
    // Function Array Object Undefined Null
    return Object.prototype.toString.call(obj) === `[object ${type}]`;
  }

  function isPrimitive(obj, key) {
    return typeof obj === key;
  }
}

var obj = {
  name: "wander",
  age: 20,
  male: true,
  companies: [
    { name: "hytera", years: 2 },
    { name: "jdt", years: 2.7 },
  ],
  desc: {
    hobby: ["code", , "cook", "fitness"],
    website: "https://github.com/WanderHuang",
    haircut: "short",
    favico: "xxx",
  },
  x: null,
  y: undefined,
  say: function () {
    console.log("u can't c this function");
  },
};

var arr = [1, 2, null, undefined, obj, [1, 2]]

// 转换对象
console.log(stringify(obj));
console.log(JSON.stringify(obj));
console.log(JSON.parse(stringify(obj)));

// 转换数组
console.log(stringify(arr));
console.log(JSON.stringify(arr));
console.log(JSON.parse(stringify(arr)));

// 转换字符串
console.log(stringify("123"))

// 转换数字
console.log(stringify(123))

// 转换空值
console.log(stringify(null))
console.log(stringify(undefined))

// 转换函数
console.log(stringify(function call() {console.log("call function")}))
