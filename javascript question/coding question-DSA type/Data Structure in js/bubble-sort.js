//Bubble sort
//Time Complexity: O(n^2) space Complexity: O(1)

function bubblesort(arr) {
  const n = arr.length;
  for (let i = 0; i <= n; i++) {
    for (let j = 0; j <= n - i; j++) {
      if (arr[j] > arr[j + 1]) {
        let temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = temp;
      }
    }
  }
  return arr;
}
const bubble = bubblesort([4, 3, 2, 5, 1]);
console.log(bubble);
