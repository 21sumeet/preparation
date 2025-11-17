//check if string are anagram or not
//example: listen and silent are anagram

function validanagram(str1, str2) {
  if (str1.length !== str2.length) return false;
  str1 = str1.split("").sort().join("");
  str2 = str2.split("").sort().join("");
  return str1 === str2;
} //time complexity: O(n log n) due to sorting || space complexity: O(1)
console.log(validanagram("listen", "silent")); // true
console.log(validanagram("hello", "billion")); // false
