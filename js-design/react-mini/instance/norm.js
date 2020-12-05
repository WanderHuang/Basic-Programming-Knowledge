import Instance from './instance';

function NormInstance(ele) {
  this.ele = ele;

  this.name = ele.name || 'IamANormInstance';
  this.node = null;
  this.children = null;
}

NormInstance.prototype.create = function (ele) {
  this.__create()
  return new NormInstance(ele);
};

NormInstance.prototype.mount = function () {
  this.node = document.createTextNode(this.ele);

  return this.node;
};

export default NormInstance;