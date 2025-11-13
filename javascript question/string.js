const str = "Hello, World!";
console.log(str.toUpperCase()); // Output: "HELLO, WORLD!"
console.log(str.toLowerCase()); // Output: "hello, world!"
console.log(str.length); // Output: 13
console.log(str.charAt(7)); // Output: "W"
console.log(str.indexOf("World")); // Output: 7

//modify string  - as string are immutable in js , we need to create a new string
let modifiedStr = str.replace("World", "JavaScript");
console.log(modifiedStr); // Output: "Hello, JavaScript!"

//searching in string
console.log(str.includes("Hello")); // Output: true
console.log(str.indexOf("o")); // Output: 4
console.log(str.startsWith("Hello")); // Output: true
console.log(str.endsWith("!")); // Output: true

//trim string
const strWithSpaces = "   Hello, World!   ";
console.log(strWithSpaces.trim()); // Output: "Hello, World!"
console.log(strWithSpaces.trimStart()); // Output: "Hello, World!   "
console.log(strWithSpaces.trimEnd()); // Output: "   Hello, World!"

//exract substring
const anotherStr = "JavaScript is awesome";
console.log(anotherStr.substring(0, 10)); // Output: "JavaScript"
console.log(anotherStr.substring(13)); // Output: "awesome"
console.log(anotherStr.slice(13, -1)); // Output: "awesome"

//ascii value
console.log("A" === "a"); // false ....bcoz case sensitive and have different ascii values
console.log("A".charCodeAt(0)); // Output: 65
console.log("a".charCodeAt(0)); // Output: 97
console.log(String.fromCharCode(65)); // Output: "A"
