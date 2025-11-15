const arr = [10, 20, 30, 40, 50];

// Linear Search
function linearsearch(array, target) {
  for (let i = 0; i < array.length; i++) {
    if (array[i] === target) {
      return i; // Return the index if found
    }
  }
  return -1; // Return -1 if not found
}
console.log(linearsearch(arr, 30)); // Output: 2
//time complexity O(n)   space complexity O(1)

// global linear search : when same element present multiple times in array than we can return all the index of that element
function globallinearsearch(arr, target) {
  const result = [];
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === target) {
      result.push(i);
    }
  }
  if (result.length === 0) return -1;
  return result;
}
console.log(globallinearsearch([10, 20, 30, 40, 30, 50], 30)); // Output: [2, 4]
//time complexity O(n)   space complexity O(n)
