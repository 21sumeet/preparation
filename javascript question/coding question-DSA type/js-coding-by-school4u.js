// Find the maximum number in an array
const arr = [3, 30, 34, 5, 9];
console.log(Math.max(...arr)); // Output: 34
// time complexity : O(n)
// space complexity : O(1)

// Find length of Object
const obj = { name: "John", age: 30, city: "New York" };
console.log(Object.keys(obj).length); // Output: 3
// time complexity : O(n)
// space complexity : O(n)

// in arry of obj , filter out those obj which have gender value
const arrOfObj = [
  { name: "Alice", age: 25, gender: "female" },
  { name: "Bob", age: 30 },
  { name: "Charlie", age: 35, gender: "male" },
  { name: "David", age: 40 },
];
const filterArr = arrOfObj.filter((obj) => {
  return obj.hasOwnProperty("gender");
});
console.log(filterArr);
