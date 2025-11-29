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

//add only number from arr of fix string and number
let arr = ["ad", 21, "dsvfv", 45, "sdf", 18];
function addnumber(arr) {
  let sum = 0;
  arr.forEach(function (ele) {
    if (typeof ele === "number") sum = sum + ele;
  });
  return sum;
}
console.log(addnumber(arr));

//remove object from arr whos gender is not male , return new arr
var array = [
  { name: "knight", gender: "male" },
  { name: "golem", gender: "male" },
  { name: "pekka", gender: "female" },
  { name: "healer", gender: "female" },
];
function genderbais(arr) {
  let newarr = [];
  for (var obj of arr) {
    if (obj.gender == "male") {
      newarr.push(obj);
    }
  }
  return newarr;
}
console.log(genderbais(array));

//deep clone of object
const originalObj = {
  name: "John",
  age: 30,
  address: {
    city: "Mumbai",
    pincode: 400001,
  },
  hobbies: ["reading", "gaming"],
};
function deepclone(obj) {
  return JSON.parse(JSON.stringify(obj));
}
const clonedObj = deepclone(originalObj);
clonedObj.address.city = "Delhi"; // Doesn't affect original

console.log(originalObj.address.city); // "Mumbai"
console.log(clonedObj.address.city); // "Delhi"

//print last n element from arr
function lastNele(arr, n = 1) {
  if (arr.length > n) {
    for (let i = 0; i < n; i++) {
      console.log(arr[arr.length - 1 - i]);
    }
  }
}
lastNele([1, 2, 4, 6, 8, 7], 3);

//most freq item of arr
let map = new Map();
function mostfreqitem(arr) {
  let map = new Map();
  for (item of arr) {
    if (map.has(item)) {
      map.set(item, map.get(item) + 1);
    } else {
      map.set(item, 1);
    }
  }
  let maxCount = 0;
  let mostFrequentItem = null;
  for (let [item, count] of map) {
    if (count > maxCount) {
      maxCount = count;
      mostFrequentItem = item;
    }
  }
  return { item: mostFrequentItem, frequency: maxCount };
}
console.log(mostfreqitem([1, 2, 2, 5, 5, 2, 5, 7]));

//union of 2 arr
function union(arr1, arr2) {
  let unionSet = new Set([...arr1, ...arr2]);
  return Array.from(unionSet).sort((a, b) => a - b);
}
console.log(union([1, 2, 3], [100, 2, 5])); // 1 ,2,3,5,100
