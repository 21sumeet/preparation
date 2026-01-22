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
