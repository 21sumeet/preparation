const person = {
  name: "Alice",
  age: 30,
  city: "New York",

  greatperson() {
    return `hello ${this.name} from ${this.city}`;
  },
};
console.log(person.greatperson()); // Output: hello Alice from New York

const tree = {
  value: 10,
  left: {
    value: 5,
  },
  right: {
    value: 15,
  },
  insertvalue(newValue) {
    this.value = newValue;
  },

  treeinfo() {
    return `Root: ${this.value}, Left Child: ${this.left.value}, Right Child: ${this.right.value}`;
  },
  treeinfoArrow: () => {
    // Arrow function does not bind 'this' so we use 'tree' directly
    return `Root: ${tree.value}, Left Child: ${tree.left.value}, Right Child: ${tree.right.value}`;
  },
};
console.log(tree.treeinfo()); // Output: Root: 10, Left Child: 5, Right Child: 15
console.log(tree.treeinfoArrow()); // Output: Root: 10, Left Child: 5, Right Child: 15
tree.insertvalue(20);
console.log(tree.treeinfo()); // Output: Root: 20, Left Child: 5, Right Child: 15
