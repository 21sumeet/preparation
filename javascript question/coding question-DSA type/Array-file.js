let arr = [1, 0, 2, 2, 3, 4, 6, 3, 0, 0, 6, 6, 7, 8];
let simplearr = [1, 2, 3, 4, 5, 6];
//remove even numbers
function remove(arr) {
  return arr.filter((item) => item % 2 !== 0);
}
console.log(remove(arr));

//second min in arr
function secondMin(arr) {
  arr.sort((a, b) => a - b);
  return arr[1];
}
console.log(secondMin(arr));

//remove duplicate from arr
function removeduplicate(arr) {
  let set = new Set();
  for (let num of arr) {
    set.add(num);
  }
  return set;
}
console.log(removeduplicate(arr));

//move zero to end
function movezerotoend(arr) {
  let length = arr.length;
  let newarr = arr.filter((num) => num != 0);
  while (newarr.length != length) {
    newarr.push(0);
  }
  return newarr;
}
console.log(movezerotoend(arr));

//left rotate arr by d places
function leftrotatearr(arr, d) {
  return [...arr.slice(d), ...arr.slice(0, d)];
}
console.log(leftrotatearr(simplearr, 2)); // [3, 4, 5, 1, 2]

//union of 2 arr
let arr2 = [1, 4, 6, 7, 8, 9];
function unionofarrs(arr1, arr2) {
  return [...new Set([...arr1, ...arr2])].sort();
}
console.log(unionofarrs(simplearr, arr2));
