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

//optimized approach using frequency counter object
function validanagramoptimized(str1, str2) {
  if (str1.length !== str2.length) return false;
  let frequencyCounter1 = {};
  let frequencyCounter2 = {};
  for (let i = 0; i < str1.length; i++) {
    let char1 = str1[i];
    let char2 = str2[i];
    frequencyCounter1[char1] = (frequencyCounter1[char1] || 0) + 1;
    frequencyCounter2[char2] = (frequencyCounter2[char2] || 0) + 1;
  }
  for (let key in frequencyCounter1) {
    if (frequencyCounter1[key] !== frequencyCounter2[key]) {
      return false;
    }
  }
  return true;
} //time complexity: O(n) || space complexity: O(n)
console.log(validanagramoptimized("listen", "silent")); // true
console.log(validanagramoptimized("hello", "billion")); // false
