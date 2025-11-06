// get 2nd largest number from an array
// example: [3,5,1,4,2] => 4

//Brute force approach: sort the array and return the 2nd last element
function get2ndLargestNumber(arr) {
  const uniqueArr = [...new Set(arr)]; // remove duplicates
  if (uniqueArr.length < 2) {
    return null; // not enough unique elements
  }
  uniqueArr.sort((a, b) => b - a);
  return uniqueArr[1]; // return the 2nd largest number
}
console.log(get2ndLargestNumber([3, 5, 1, 4, 2])); // 4
//time complexity: O(n log n) due to sorting
