//fill method - Using the fill() method to fill elements in an array with a static value
// array.fill(value, start, end)

let numbers = [1, 2, 3, 4, 5];
numbers.fill(0);
console.log(numbers); // Output: [0, 0, 0, 0, 0]

let arr = [1, 2, 3, 4, 5];
arr.fill(9, 2);
console.log(arr); // Output: [1, 2, 9, 9, 9]

let fruits = ["apple", "banana", "cherry", "mango"];
fruits.fill("kiwi", 1, 3);
console.log(fruits); // Output: ['apple', 'kiwi', 'kiwi', 'mango']
