// //normal function
// function add(a , b,c){
//     return a + b + c;
// }

//function currying
function add(a) {
  return function (b) {
    return function (c) {
      return a + b + c;
    };
  };
}
console.log(add(1)(2)(3));
console.log(add(1, 2, 3)); //[Function (anonymous)]  for this type , function currying is not working

//write a function that will work for both case
function multiple(a, b, c) {
  if (b != undefined || c != undefined) {
    return a * b * c;
  } else {
    return function (b) {
      return function (c) {
        return a * b * c;
      };
    };
  }
}
console.log(multiple(5, 2, 3));
console.log(multiple(5)(2)(3));

//example
// Currency converter
function convert(rate, amount) {
    return amount * rate;
}
// Curried version
function curriedConvert(rate) {
    return function(amount) {
        return amount * rate;
    };
}
// Create specialized converters
const usdToInr = curriedConvert(83);    // 1 USD = 83 INR
const eurToInr = curriedConvert(89);    // 1 EUR = 89 INR

console.log(usdToInr(100));  // 8300 (100 USD to INR)
console.log(eurToInr(100));  // 8900 (100 EUR to INR)
