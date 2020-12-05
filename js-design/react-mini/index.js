import DomInstance from './instance/dom';
import NormInstance from './instance/norm';
import EmptyInstance from './instance/empty';
import getInstanceByElement from './instance';
// createElement
function createElement(type, config) {
  if (!config) return type;

  const props = Object.assign({}, config);

  if (arguments.length > 2) {
    const children = [].slice.call(arguments, 2);
    props.children = children;
  }

  return {
    type,
    props,
    $$typeof: 'bereactor',
  };
}

// 创建Element
let ele = createElement(
  'div',
  { style: 'background: red' },
  createElement(
    'span',
    { style: 'font-size: 20px' },
    createElement('你好！React', null),
    createElement('abc', null),
    createElement(123, null),
    createElement(undefined, null),
    createElement(null, null),
    createElement(true, null),
  ),
  createElement(
    'div',
    { style: 'font-size: 40px; background: green' },
    createElement('你好！React', null),
    createElement('abc', null),
    createElement(123, null),
    createElement(undefined, null),
    createElement(null, null),
    createElement(true, null),
  )
);

// 渲染函数
function render(ele, dom) {
  // 获取VNode
  let instance = getInstanceByElement(ele);

  if (instance) {
    let node = instance.mount();
  
    dom.appendChild(node);
  }
}





// 运行

render(ele, document.querySelector('#root'));
