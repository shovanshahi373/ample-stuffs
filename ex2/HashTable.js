//hash table is for storing data in hashed locations which is determined by the key of the data and a specific hash function. the hash function takes in a key and hashes it into a certain hash value that lies to a certain domain of values.

const { hash } = require("./utils");

module.exports = class HashTable {
  constructor(size) {
    this.table = Array(size).fill([]);
    this.size = size;
  }
  insert(key, value) {
    const idx = hash(key, this.size);
    this.table[idx] = [...this.table[idx], { key, value }];
  }
  remove(key) {
    const idx = hash(key, this.size);
    this.table[idx] = this.table[idx].filter((obj) => obj.key !== key);
  }
  search(key) {
    const idx = hash(key, this.size);
    const item = this.table[idx].find((obj) => obj.key === key);
    if (item) {
      return {
        bucketNo: idx,
        content: item,
      };
    } else {
      return null;
    }
  }
};
