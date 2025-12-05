//output based question
// Prmoise question
console.log("start");
const promise1 = new Promise((resolve, reject) => {
  console.log(1);
  resolve(2);
});
promise1.then((res) => {
  console.log(res);
});
console.log("stop");
//output :
// start
// 1
// stop
// 2
//Simple Explanation: Synchronous code runs immediately (start, 1, stop)
// Promise .then() callbacks go to the microtask queue and run after all synchronous code finishes (2)

console.log("start");
const promise2 = new Promise((resolve, reject) => {
  console.log(1);
  resolve(2);
  console.log(3);
});
promise2.then((res) => {
  console.log(res);
});
console.log("stop");
//output :
// start
// 1
// 3
// stop
// 2

console.log("start");
const promise3 = new Promise((resolve, reject) => {
  console.log(1);
  console.log(3);
});
promise3.then((res) => {
  console.log(res);
});
console.log("stop");
//output :
// start
// 1
// 3
// stop
//explaination : as there are no resolve function nor reject so .then will not execute

//promise chainaing
function promiseFunction() {
  return new Promise((resolve, reject) => {
    reject(new Error("Something went wrong"));
  });
}
const job = promiseFunction();
job
  .then(function () {
    console.log("success 1");
  })
  .then(function () {
    console.log("success 2");
  })
  .catch(function () {
    console.log("error 1");
  })
  .then(function () {
    console.log("success 3");
  });
// Output: "error 1" then "success 3"
