import Instance from './instance';
import getInstanceByElement, {isEmpty, isNorm} from './index'

function DomInstance(ele) {
  this.ele = ele;
  this.name = ele ? ele.name : 'IamADomInstance';
  this.children = null;
  this.node = null;
}
DomInstance.prototype = new Instance();

DomInstance.prototype.create = function (ele) {
  this.__create(ele)
  return new DomInstance(ele);
};

DomInstance.prototype.mount = function () {
  const { type, props = {} } = this.ele || {};

  const { children = [] } = props;

  this.node = document.createElement(type);

  Object.keys(props).forEach((name) => {
    if (name !== 'children') {
      this.node.setAttribute(name, props[name]);
    }
  });

  if (children && children.length) {
    for (let i = 0; i < children.length; i++) {
      let n = children[i];

      if (!this.children) {
        this.children = [];
      }

      this.children[i] = getInstanceByElement(n);
    }

    this.children
      .filter(n => !isEmpty(n) && !isEmpty(n.node))
      .map((n) => n.mount())
      .forEach((n) => this.node.appendChild(n));
  }

  return this.node;
};

export default DomInstance;