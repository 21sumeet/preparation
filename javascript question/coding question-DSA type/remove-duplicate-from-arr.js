// question: Remove Duplicates from a sorted Array
// Given an array of integers, write a function that removes duplicate values and returns a new array with only unique values.
// Example:
// Input: [1, 2, 2, 3, 4, 4, 5]
// Output: [1, 2, 3, 4, 5]

//brute force approach using Set
function removeDuplicates(arr) {
  return [...new Set(arr)];
}
const inputArray = [1, 2, 2, 3, 4, 4, 5];
const uniqueArray = removeDuplicates(inputArray);
console.log("Unique Array using Set:", uniqueArray); // Output: [1, 2, 3, 4, 5]
// time complexity : O(n)
// space complexity : O(n)

//optimal approach
//in place approach using splice
function removeDuplicatesInPlace(arr) {
  for (let i = 0; i < arr.length - 1; i++) {
    if (arr[i] === arr[i + 1]) {
      arr.splice(i, 1);
      i--; // Adjust index after removal
    }
  }
  return arr;
}
const inputArrayInPlace = [1, 2, 2, 3, 4, 4, 5];
const uniqueArrayInPlace = removeDuplicatesInPlace(inputArrayInPlace);
console.log("Unique Array using splice:", uniqueArrayInPlace); // Output: [1, 2, 3, 4, 5]
// time complexity : O(n^2) because splice is O(n) and we are using it inside a loop
// space complexity : O(1) no extra space used

//two pointer approach without using splice
function removeDuplicatesTwoPointer(arr) {
  if (arr.length === 0) return arr;
  let i = 0; // slow pointer
  for (let j = 1; j < arr.length; j++) {
    // fast pointer
    if (arr[i] !== arr[j]) {
      i++;
      arr[i] = arr[j];
    }
  }
  arr.length = i + 1; // resize array to new length
  return arr;
}
const inputArrayTwoPointer = [1, 2, 2, 3, 4, 4, 5];
const uniqueArrayTwoPointer = removeDuplicatesTwoPointer(inputArrayTwoPointer);
console.log("Unique Array using Two Pointer:", uniqueArrayTwoPointer); // Output: [1, 2, 3, 4, 5]
// time complexity : O(n)
// space complexity : O(1) no extra space used
