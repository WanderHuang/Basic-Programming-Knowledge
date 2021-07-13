function parse(str) {
  // 强转为字符串
  str = String(str);
  let i = 0;
  let len = str.length;

  let top;

  // 去掉空格 
  if (i < len) {
    filterSpace();
  }

  if (i < len) {
    if (str[i] === "{") { // 对象
      top = parseObject();
    } else if (str[i] === "[") { // 数组
      top = parseArray();
    } else { // 字符串
      top = parseString();
    }
  }

  return top;
  /**
   * 转换String类型
   */
  function parseString() {
    let res = "";
    if (str[i] === '"') {
      i++;
    }
    // char[i] => String
    while (str[i] !== '"' && i < len) {
      res += str[i++];
    }
    i++;

    return res;
  }

  /**
   * 过滤空格符号
   */
  function filterSpace() {
    while (i < len && (str[i] === " " || str[i] === "\n")) {
      i++;
    }
  }

  /**
   * 过滤逗号
   */
  function filterColon() {
    while (str[i] === ",") {
      i++;
    }
  }

  /**
   * 转换对象
   */
  function parseObject() {
    let obj = {};
    if (str[i] === "{") {
      i++;
    }

    // 对象内数据转换
    while (str[i] !== "}" && i < len) {
      
      filterSpace();
      if (str[i] === '"') {
        i++;
      }

      let key = parseString();
      filterSpace();
      if (str[i] === ":") {
        i++;
      }
      filterSpace();
      if (str[i] === '"') {
        obj[key] = parseString();
      } else if (str.substring(i, i + 4) === "true") {
        obj[key] = true;
        i += 4;
      } else if (str.substring(i, i + 5) === "false") {
        obj[key] = false;
        i += 5;
      } else if (str[i] === "{") {
        obj[key] = parseObject();
      } else if (str[i] === "[") {
        obj[key] = parseArray();
      } else if (
        str[i] === "-" ||
        str[i] === "+" ||
        (Number(str[i]) >= 0 && Number(str[i]) <= 9)
      ) {
        obj[key] = parseNumber();
      }

      filterSpace();
      filterColon();
      filterSpace();
    }

    filterSpace();
    filterColon();
    filterSpace();
    if (str[i] === "}") {
      i++;
    }

    return obj;
  }
  function parseArray() {
    if (str[i] === "[") {
      i++;
    }

    let res = [];
    filterSpace();

    while (str[i] !== "]" && i < len) {
      filterSpace();
      if (str[i] === ",") {
         res.push();
         i++;  
      } else if (str[i] === '"') {
        res.push(parseString());
      } else if (str.substring(i, i + 4) === "true") {
        res.push(true);
      } else if (str.substring(i, i + 5) === "false") {
        res.push(false);
      } else if (str[i] === "{") {
        res.push(parseObject());
      } else if (str[i] === "[") {
        res.push(parseArray());
      } else if (
        str[i] === "-" ||
        str[i] === "+" ||
        (Number(str[i]) >= 0 && Number(str[i]) <= 9)
      ) {
        res.push(parseNumber());
      }
    }

    filterSpace();
    if (str[i] === "]") {
      i++
    }

    return res;
  }
  function parseNumber() {
    let x = i;
    while (
      i < len &&
      str[i] !== "," &&
      str[i] !== " " &&
      str[i] !== "}" &&
      str[i] !== "]"
    ) {
      i++;
    }
    let y = i;

    return Number(str.substring(x, y));
  }
}

var obj = {
    name: "wander",
    age: 20,
    male: true,
    companies: [
        { name: "hytera", years: 2 },
        { name: "jdt", years: 2.7 }
    ],
    desc: {

      hobby: ["code", "cook", "fitness"],
      website: "https://github.com/WanderHuang",
      haircut: "short",
      favico: "xxx"

    }
}

var str = JSON.stringify(obj);

var o = parse(str)

console.log(str)
console.log(o)

console.log(parse(true), parse(false), parse(1), parse(" t."))


