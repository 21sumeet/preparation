//duplicate an array in sucbh a way that original array elements are followed by the same elements
function duplicate(arr) {
  return [...arr, ...arr];
}
console.log(duplicate([1, 2, 4]));

//reverse a number
function reversenum(num) {
  return Number(num.toString().split("").reverse().join(""));
}
console.log(reversenum(123));

//check whether a string is palindrome or not
function palstring(str) {
  let str1 = str.split("").reverse().join("");
  return str == str1;
}
console.log(palstring("loop"));
