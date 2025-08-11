// situation: We have a function `fn` that we cannot change or access directly.but we want to logs a message every third time `fn` is called.

function fn() {
  // Original function code (we cant change this /acess this )
}
function fnWrapper(fn) {
  let count = 0;
  return function () {
    count++;
    if (count % 3 === 0) {
      console.log("fu called ");
    }
  };
}
const newfn = fnWrapper(fn);
newfn(); // Call 1
newfn(); // Call 2
newfn(); // Call 3 - should log "fu called"

// using call function
const fn = function () {
  // Original function code (we cant change this /acess this )
};
const fnWrapper = function (fn) {
  let count = 0;
  return function () {
    count++;
    if (count % 3 === 0) {
      console.log("fu called by call function");
    }
    fn.call(this, ...arguments);
  };
};
const newfn = fnWrapper(fn);
newfn();
newfn();
newfn();

// using apply function
const fn = function () {
  // Original function code (we cant change this /acess this )
};
const fnWrapper = function (fn) {
  let count = 0;
  return function () {
    count++;
    if (count % 3 === 0) {
      console.log("fu called by apply function");
    }
    fn.apply(this, ...arguments);
  };
};
const newfn = fnWrapper(fn);
newfn();
newfn();
newfn();
