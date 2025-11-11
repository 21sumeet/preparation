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

//check if all element in array are number
const mixedArr = [1, 2, 3, "4", 5];
const allNumbers = mixedArr.every((item) => typeof item === "number");
console.log(allNumbers); // Output: false

//another way
function areAllNumbers(arr) {
  for (let item of arr) {
    if (typeof item !== "number") {
      return false;
    }
  }
  return true;
}
console.log(areAllNumbers(mixedArr)); // Output: false

// isPrime number
function isPrime(num) {
  if (num <= 1) return false;
  for (let i = 2; i <= Math.sqrt(num); i++) {
    if (num % i === 0) return false;
  }
  return true;
}
console.log(isPrime(11)); // Output: true
console.log(isPrime(15)); // Output: false

// remove duplicates from array
const arrayWithDuplicates = [1, 2, 2, 3, 4, 4, 5];
const uniqueArr = [...new Set(arrayWithDuplicates)];
console.log(uniqueArr); // Output: [1, 2, 3, 4, 5]
// time complexity : O(n)
// space complexity : O(n)
