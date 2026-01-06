let arr = [1, 0, 2, 2, 3, 4, 6, 3, 0, 0, 6, 6, 7, 8];
let simplearr = [1, 2, 3, 4, 5, 6];
//remove even numbers
function remove(arr) {
  return arr.filter((item) => item % 2 !== 0);
}
console.log(remove(arr));

//second min in arr
function secondMin(arr) {
  arr.sort((a, b) => a - b);
  return arr[1];
}
console.log(secondMin(arr));

//remove duplicate from arr
function removeduplicate(arr) {
  let set = new Set();
  for (let num of arr) {
    set.add(num);
  }
  return set;
}
console.log(removeduplicate(arr));

//move zero to end
function movezerotoend(arr) {
  let length = arr.length;
  let newarr = arr.filter((num) => num != 0);
  while (newarr.length != length) {
    newarr.push(0);
  }
  return newarr;
}
console.log(movezerotoend(arr));

//move zeros to end
function zeroToEnd(arr) {
  let result = [];
  let zeros = 0;
  for (let val of arr) {
    if (val !== 0) {
      result.push(val);
    } else {
      zeros++;
    }
  }
  while (zeros--) {
    result.push(0);
  }
  console.log(result);
}
zeroToEnd([1, 0, 3, 40, 0, 2, 0]); //[1, 3, 40, 2, 0, 0,  0]

//left rotate arr by d places
function leftrotatearr(arr, d) {
  return [...arr.slice(d), ...arr.slice(0, d)];
}
console.log(leftrotatearr(simplearr, 2)); // [3, 4, 5, 1, 2]

//reverse array by d
function reversebyK(arr, k) {
  const result = arr.splice(k).concat(arr.splice(0, k));
  console.log(result);
}
reversebyK([1, 2, 3, 4, 5], 2); //[ 3, 4, 5, 1, 2 ]

//union of 2 arr
let arr2 = [1, 4, 6, 7, 8, 9];
function unionofarrs(arr1, arr2) {
  return [...new Set([...arr1, ...arr2])].sort();
}
console.log(unionofarrs(simplearr, arr2));

//intersection of 2 sorted arrays
function intersectionSorted(arr1, arr2) {
  let i = 0,
    j = 0;
  let result = [];
  while (i < arr1.length && j < arr2.length) {
    if (arr1[i] === arr2[j]) {
      result.push(arr1[i]);
      i++;
      j++;
    } else if (arr1[i] < arr2[j]) {
      i++;
    } else {
      j++;
    }
  }

  return result;
}
console.log(intersectionSorted([1, 2, 3, 4], [3, 4, 5, 6])); // [3, 4]

//missing Number
function missingNumber(arr) {
  let sum = arr.reduce((acc, val) => acc + val, 0);
  let n = arr.length;
  n = (n * (n + 1)) / 2;
  return n - sum || sum - n;
}
console.log(missingNumber([0, 1, 3]));

//maximum consecutive 1's in arr
function maxOne(arr) {
  let count = 0,
    max = 0;
  for (let num of arr) {
    if (num == 1) {
      count++;
    }
    if (count > max) {
      max = count;
    }
    if (num != 1) {
      count = 0;
    }
  }
  return max;
}
console.log(maxOne([0, 1, 2, 3, 1, 1, 1, 4]));

//maximum of subarray-   leetcode 53
function maxSubArray(nums) {
  let maxSoFar = nums[0];
  let currentMax = nums[0];

  for (let i = 1; i < nums.length; i++) {
    // Either extend the current subarray or start new
    currentMax = Math.max(nums[i], currentMax + nums[i]);
    maxSoFar = Math.max(maxSoFar, currentMax);
  }

  return maxSoFar;
}
console.log(maxSubArray([-2, 1, -3, 4, -1, 2, 1, -5, 4])); // 6

//rearrange array by sign -leetcode 2149
function rearrangeArray(nums) {
  let positives = [];
  let negatives = [];
  // Separate positives and negatives
  for (let num of nums) {
    if (num > 0) {
      positives.push(num);
    } else {
      negatives.push(num);
    }
  }
  let result = [];
  for (let i = 0; i < positives.length; i++) {
    result.push(positives[i]);
    result.push(negatives[i]);
  }

  return result;
}
console.log(rearrangeArray([3, 1, -2, -5, 2, -4])); // [3,-2,1,-5,2,-4]

//remove falsely value from array
function removefalsely(arr) {
  const res = [];
  for (let val of arr) {
    if (val) {
      res.push(val);
    }
  }
  return res;
}
console.log(removefalsely([0, "", 1, 2, false, null, 3])); //[ 1, 2, 3 ]

//sort arr and make all values number
const array = [1, 4, "2", "3", 5, "21"];
const sortedNumbers = array.map((item) => Number(item)).sort((a, b) => a - b);
console.log(sortedNumbers); // [1, 2, 3, 4, 5, 21]
