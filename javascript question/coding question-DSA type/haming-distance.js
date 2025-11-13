//haming distanc
//The Hamming distance between two strings of equal length is the number of positions at which the corresponding symbols are different. It measures how many substitutions are required to change one string into the other.
//example: "karolin" and "kathrin" => 3

function haming(str1, str2) {
  if (str1.length !== str2.length) return -1; // return -1 if strings are of unequal length
  let distance = 0;
  for (let i = 0; i < str1.length; i++) {
    if (str1[i] !== str2[i]) {
      distance++;
    }
  }
  return distance;
}
// Example usage:
console.log(haming("karolin", "kathrin")); // Output: 3
console.log(haming("1011101", "1001001")); // Output: 2
