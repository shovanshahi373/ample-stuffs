const { linkedList } = require("./LinkedList");
const { tree } = require("./BinaryTree");
const HashTable = require("./HashTable");

// linkedList.insert(10);
// linkedList.insert(20);
// linkedList.insert(30);
// linkedList.insert(40);
// linkedList.insert(50);
// linkedList.view();

// const values = [10, 22, 25, 20, 43];

// values.map((num) => tree.insert(num));

// tree.search(41);

const hashTable = new HashTable(20);
console.log(hashTable);
hashTable.insert("sovan", { age: 26, address: "kalanki" });
hashTable.insert("bumblebee", { age: 36, address: "transformers" });
hashTable.insert("catyx", { age: 31, address: "new boston" });
hashTable.insert("rason", { age: 33, address: "mayak" });
hashTable.insert("gurilla", { age: 32, address: "ria" });
hashTable.insert("freska", { age: 54, address: "tutos" });
hashTable.insert("elephantsky", { age: 44, address: "aapii" });
console.log(JSON.stringify(hashTable, null, 4));
