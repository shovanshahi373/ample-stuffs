let counter;
const { print } = require("./utils");

class Tree {
  constructor() {
    this.root = null;
    this.depth = 0;
    this.nodes = 0;
    this.leaves = 0;
  }

  insert(data, currentNode = this.root) {
    if (currentNode === null) {
      //root of tree
      const node = new Node(data);
      this.nodes++;
      this.root = node;
      this.getLeaves();
      return print(this);
    }
    if (data > currentNode.data) {
      if (currentNode.leftChild === null) {
        const node = new Node(data);
        this.nodes++;
        currentNode.leftChild = node;
        this.getLeaves();
        print(this);
      } else this.insert(data, currentNode.leftChild);
    } else {
      if (currentNode.rightChild === null) {
        const node = new Node(data);
        this.nodes++;
        currentNode.rightChild = node;
        this.getLeaves();
        print(this);
      } else this.insert(data, currentNode.rightChild);
    }
  }

  isLeaf(node) {
    if (node.leftChild !== null) this.isLeaf(node.leftChild);
    if (node.rightChild !== null) this.isLeaf(node.rightChild);

    if (node.leftChild === null && node.rightChild === null) {
      counter += 1;
      this.leaves = counter;
    }
  }

  getLeaves(current = this.root) {
    counter = 0;
    this.isLeaf(current);
  }

  search(value, currentNode = this.root) {
    if (currentNode === null)
      return console.log(`the value ${value} doesn't exist!`);
    if (value === currentNode.data)
      return console.log(`the value ${value} exists @ \n
      ==========================================
    ${JSON.stringify(currentNode, null, 4)}\n
    ============================================
    `);
    else if (value > currentNode.data) {
      this.search(value, currentNode.leftChild);
    } else if (value < currentNode.data) {
      this.search(value, currentNode.rightChild);
    }
  }
}

class Node {
  constructor(data) {
    this.data = data;
    this.leftChild = null;
    this.rightChild = null;
  }
}

const tree = new Tree();

module.exports = { tree };
