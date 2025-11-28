function duplicate(arr) {
  return [...arr, ...arr];
}
console.log(duplicate([1, 2, 4]));

function reversenum(num) {
  return Number(num.toString().split("").reverse().join(""));
}
console.log(reversenum(123));

function palstring(str) {
  let str1 = str.split("").reverse().join("");
  return str == str1;
}
console.log(palstring("loop"));
