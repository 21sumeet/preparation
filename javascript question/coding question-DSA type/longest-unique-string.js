//longestUniqueSubstr("abcabcbb"); // → 3 ("abc")

function longestUniqueSubstr(str) {
  let left = 0;
  let maxLength = 0;
  let charSet = new Set();
  for (let right = 0; right < str.length; right++) {
    while (charSet.has(str[right])) {
      charSet.delete(str[left]);
      left++;
    }

    charSet.add(str[right]);
    maxLength = Math.max(maxLength, right - left + 1);
  }

  return maxLength;
}
console.log(longestUniqueSubstr("abcabcd"));
