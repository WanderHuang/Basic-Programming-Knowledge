import DomInstance from './dom';
import NormInstance from './norm';
import EmptyInstance from './empty';
// 构建实例
function getInstanceByElement(ele) {
  let instance;
  if (isNorm(ele)) {
    instance = new NormInstance(ele);
  } else if (isEmpty(ele)) {
    instance = new EmptyInstance(ele);
  } else {
    instance = new DomInstance(ele);
  }

  return instance;
}

export  function isNorm(ele) {
  return typeof ele === 'string' || typeof ele === 'number'

}

export function isEmpty(ele) {
  return typeof ele === 'undefined' || typeof ele === 'boolean';
} 

export default getInstanceByElement;
