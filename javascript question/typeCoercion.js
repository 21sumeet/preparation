//Type coercion : Type coercion is the automatic conversion of one data type to another data type.
console.log("" == true); // output : false
// reason: Empty string "" converts to 0, true converts to 1, so 0 == 1 is false

console.log(" " == true); // output : false
//reason :Space string " " converts to 0, true converts to 1, so 0 == 1 is false

console.log([] == []); // output : false
//reason : Each [] creates a new array object in different memory locations, so they're different references
