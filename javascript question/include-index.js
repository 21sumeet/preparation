const fruits = ["apple", "banana", "mango", "orange"];

//includes : it returns true or false
const hasfruit = fruits.includes("banana");
console.log(hasfruit);

//includes for string
let str = "my name is Badhsha";
const ans = str.includes("shj");
console.log(ans);

//indexof : it returns index if found else -1
const indexoffruit = fruits.indexOf("mango");
console.log(indexoffruit);
const indexoffruitnotfound = fruits.indexOf("grape");
console.log(indexoffruitnotfound);
