// Online Javascript Editor for free
// Write, Edit and Run your Javascript code using JS Online Compiler
function merge(left, right) {
  let sortedArr = [];
  let i = 0,
    j = 0,
    k = 0;
  while (i < left.length && j < right.length) {
    if (left[i] < right[j]) {
      sortedArr.push(left[i]);
      i++;
    } else {
      sortedArr.push(right[j]);
      j++;
    }
  }
  // Add remaining elements from left array
  while (i < left.length) {
    sortedArr.push(left[i]);
    i++;
  }
  // Add remaining elements from right array
  while (j < right.length) {
    sortedArr.push(right[j]);
    j++;
  }
  return sortedArr;
}
function mergesort(arr) {
  if (arr.length <= 1) return arr;
  let mid = Math.floor(arr.length / 2);

  let left = mergesort(arr.slice(0, mid));
  let right = mergesort(arr.slice(mid, arr.length));
  return merge(left, right);
}
console.log(mergesort([3, 5, 8, 5, 99, 1]));
