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


//Exchange sort ( most basic )
//Time Complexity: O(n^2) space Complexity: O(1)
//this is most standard sorting and worse compare to other sorting algo
const arr = [80 , 10 , 12 ,15, 9, 11];
function sort(arr){
  for(let i = 0; i<arr.length;i++){
    for(let j = i+1;j<arr.length;j++){
      if(arr[i]>arr[j]){
        let temp = arr[i];
        arr[i]= arr[j];
        arr[j]= temp;
      }
    }
  }
  return arr;
}
console.log(sort(arr))
