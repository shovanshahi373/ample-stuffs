//linked list

class LinkedList {
  constructor() {
    this.head = null;
    this.length = 0;
  }
  insert(data) {
    const node = new Node(data, this.head);
    this.head = node;
    this.length++;
  }
  view() {
    let output = "";
    let current = this.head;
    while (current) {
      output = output + ` |_${current.data}_|___| `;
      if (current.next) output += "--->";
      current = current.next;
    }
    console.log(output);
  }
  getNodeByIndex(i) {
    let current = this.head;
    for (let count = 0; count < i; count++) {
      current = current.next;
    }
    console.log(current);
  }
}

class Node {
  constructor(data, next) {
    this.data = data;
    this.next = next;
  }
}

class DoublyLinkedList extends LinkedList {
  constructor() {
    super();
  }
}

const linkedList = new LinkedList();
const dblyLinkedList = new DoublyLinkedList();

module.exports = { linkedList };
