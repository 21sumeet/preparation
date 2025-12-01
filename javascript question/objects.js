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
//-------------------------------------------------------------------------------------------------------------------------
//
//
//Call method - calling a function with a specific 'this' context
function introduce(greeting) {
  return `${greeting}, I am ${this.name} from ${this.city}`;
}
const user = { name: "Bob", city: "Los Angeles" };
console.log(introduce.call(user, "Hello")); // Output: Hello, I am Bob from Los Angeles

//
//Apply method - similar to call but takes arguments as an array
console.log(introduce.apply(user, ["Hi"])); // Output: Hi, I am Bob from Los Angeles
function sumNumbers(a, b, c) {
  return a + b + c;
}
console.log(sumNumbers.apply(null, [1, 2, 3])); // Output: 6

//
//Bind method - creates a new function with 'this' bound to the specified object
function multiply(a, b) {
  return a * b * this.factor;
}
const calculator = { factor: 10 };
// bind() returns a new function
const multiplyByTen = multiply.bind(calculator);

console.log(multiplyByTen(2, 3)); // 60 (2*3*10)
