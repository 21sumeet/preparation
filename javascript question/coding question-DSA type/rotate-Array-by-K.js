//rotate arr ay by k times
// example: [1,2,3,4,5] k=2 => [4,5,1,2,3]
// [-1 ,-100, 3, 99] k=2    => [3,99,-1,-100]

function rotateArrayByK(arr, k) {
  const size = arr.length;
  k = k % size; // in case k is greater than size

  const rotate = arr.splice(size - k, k); // extract last k elements
  arr.unshift(...rotate); // add them to the front
  return arr;
}
console.log(rotateArrayByK([1, 2, 3, 4, 5], 2)); // [4,5,1,2,3]
console.log(rotateArrayByK([-1, -100, 3, 99], 2)); // [3,99,-1,-100]
// time complexity: O(n) bcox of splice o(n) and unshift O(n)

//optimized approach: reverse parts of the array without using inbuilt functions
function rotateArrayByKOptimized(arr, k) {
  const size = arr.length;
  k = k % size; // in case k is greater than size
  reverse(arr, 0, size - 1); // reverse the whole array  [5,4,3,2,1]
  reverse(arr, 0, k - 1); // reverse first k elements [4,5,3,2,1]
  reverse(arr, k, size - 1); // reverse the remaining elements [4,5,1,2,3]
  return arr;
}

function reverse(subArr, start, end) {
  while (start < end) {
    const temp = subArr[start];
    subArr[start] = subArr[end];
    subArr[end] = temp;
    start++;
    end--;
  }
}
console.log(rotateArrayByKOptimized([1, 2, 3, 4, 5], 2)); // [4,5,1,2,3]
console.log(rotateArrayByKOptimized([-1, -100, 3, 99], 2)); // [3,99,-1,-100]
