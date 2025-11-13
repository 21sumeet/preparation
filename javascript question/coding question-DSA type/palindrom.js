//palindrom number

console.log(palindrome(121)); // true
console.log(palindrome(-121)); // false

function palindrome(num) {
  let str = num.toString();
  //let reversedStr = str.split("") // "121" => ["1","2","1"]
  //    .reverse()                 // ["1","2","1"] => ["1","2","1"]
  //   .join("");                 // ["1","2","1"] => "121"
  let reversedStr = str.split("").reverse().join("");
  return str === reversedStr;
}
