//selection sort

function selectionsort(arr) {
  const n = arr.length;
  let minIndex = 0;
  for (let i = 0; i < n; i++) {
    for (let j = i + 1; j < n; j++) {
      if (arr[j] < arr[minIndex]) {
        minIndex = j;
      }
    }
    let temp = arr[i];
    arr[i] = arr[minIndex];
    arr[minIndex] = temp;
    minIndex = i + 1;
  }
  return arr;
}
const selection = selectionsort([4, 3, 2, 5, 1]);
console.log(selection);
