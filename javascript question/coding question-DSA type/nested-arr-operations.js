//flaten arr to 1 level
const nestedArr = [1, [2, 3], [4, [5, 6]], 7];
// using flat method
const flatarr = nestedArr.flat(1); // 1 level flaten
console.log(flatarr); // Output: [1, 2, 3, 4, [5, 6], 7]
// time complexity : O(n)
// space complexity : O(n)

//without using flat method
const nestedArr2 = [1, [2, 3], [4, [5, 6]], 7];
function flattenArray(arr, level = 1) {
  const result = [];
  for (const item of arr) {
    if (Array.isArray(item) && level > 0) {
      result.push(...flattenArray(item, level - 1));
    } else {
      result.push(item);
    }
  }
  return result;
}
const flatarr2 = flattenArray(nestedArr2);
console.log(flatarr2); // Output: [1, 2, 3, 4, [5, 6], 7]
