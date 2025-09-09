const names = ["rohit", "virat", "rahul", "sachin"];

// Join method - It joins all the elements of an array into a string.
console.log(names.join()); // rohit,virat,rahul,sachin

// join method can take a separator as an argument
console.log(names.join(" ")); // rohit virat rahul sachin

console.log(names.join("-")); // rohit-virat-rahul-sachin

console.log(names.join("|")); // rohit|virat|rahul|sachin

// toString method - It converts an array to a string of (comma separated) array values. no argument is taken
console.log(names.toString()); // rohit,virat,rahul,sachin
