// Closures : A closure is a function that retains access to its lexical scope, even when the function is executed outside that scope.
// in simple words , a closure allows a function to access variables from an outer function's scope even after the outer function has finished executing.

function outerFunction() {
  let value = 0; // variable in outer function scope
  function innerFunction() {
    value++; // inner function accessing and modifying outer function variable
    console.log("Current value:", value);
  }
  return innerFunction;
}
const closureFunction = outerFunction(); // outerFunction returns innerFunction
closureFunction(); // Output: Current value: 1
closureFunction(); // Output: Current value: 2
closureFunction(); // Output: Current value: 3  // why ? because closureFunction retains access to 'value' variable
