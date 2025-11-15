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
