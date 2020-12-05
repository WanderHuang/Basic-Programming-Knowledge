import Instance from './instance';

function EmptyInstance(ele) {
}

EmptyInstance.prototype.create = function (ele) {
  this.__create(ele)
  return new EmptyInstance(ele);
};

EmptyInstance.prototype.mount = function () {
  return null;
};

export default EmptyInstance;