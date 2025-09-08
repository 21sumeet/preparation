const fruits = ["apple", "banana", "mango", "orange"];

//include : it returns true or false
const hasfruit = fruits.includes("banana");
console.log(hasfruit);

//indexof : it returns index if found else -1
const indexoffruit = fruits.indexOf("mango");
console.log(indexoffruit);
const indexoffruitnotfound = fruits.indexOf("grape");
console.log(indexoffruitnotfound);
