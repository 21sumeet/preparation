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
//shallow copy vs reference
const a ={};
a.key = "key1";
const b = {...a} //shallow copy
b.key="key_id_1";
console.log(a.key) //key1

const a ={}; 
a.key = "key1"; 
const b = a; //object reference
b.key="key_id_1"; 
console.log(a.key) //key_id_1

//-------------------------------------------------------------------------------------------------------------------------
//print obj in such a way that values should be print simple without nexted loop
const company = {
    name : "tech company",
    employee : 100,
    department : {
        role : "Software dev",
        No_of_Employee_as_dev : 45,
        task_status:{
            frotnend_status :"done",
            backend_status :"done",
            QA_test_status:"pending"
        }
    }
}
function extract(obj){
    for(key in obj){
        if(typeof obj[key]=="object"){
            extract(obj[key]);
        }else{
            console.log(key,":",obj[key]);
        }
    }
}
extract(company) 
// //output:
// name : tech company
// employee : 100
// role : Software dev
// No_of_Employee_as_dev : 45
// frotnend_status : done
// backend_status : done
// QA_test_status : pending
//------------------------------------------------------------------------------------------------------
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
