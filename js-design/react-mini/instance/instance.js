function Instance() {
  console.log('[ Instance ] > Init')
}

Instance.prototype.__create = function() {
  console.log('[ Instance ] > Create', this.name);
}

export  default Instance;