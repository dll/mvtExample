function Cache(){
    this.cache = {};
}

Cache.prototype.set = function(sKey, sValue){
    this.cache[sKey] = sValue;
};

Cache.prototype.lookUp = function(sKey){
    return this.cache[sKey];
};

module.exports = Cache;
