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

//aphabetical order arrange
function alphabeticalorder(str) {
  return str.split("").sort().join("");
}
console.log(alphabeticalorder("helloworld"));

//uppercase of senctence -capitalize
function capitilize(str) {
  var sentence = str.split(" ").map((word) => {
    return word.charAt(0).toUpperCase() + word.substring(1);
  });
  return sentence.join(" ");
}
console.log(capitilize("elon bhai nacho"));

//freq of char in string
function frequency(str) {
  //using object
  let freq = {};
  for (var char of str) {
    if (freq[char]) {
      freq[char]++;
    } else {
      freq[char] = 1;
    }
  }
  console.log(freq);

  //using map
  var map = new Map();
  for (var char of str) {
    if (map.has(char)) {
      map.set(char, map.get(char) + 1);
    } else {
      map.set(char, 1);
    }
  }
  console.log(map);
}
console.log(frequency("bumblebee"));
