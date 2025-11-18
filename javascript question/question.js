//most frequent char in string
function freq(str) {
  const freqobj = {};
  let maxcount = 0;
  let ans = [];

  // Count frequencies and find max count
  for (let char of str) {
    if (freqobj[char]) {
      freqobj[char]++;
    } else {
      freqobj[char] = 1;
    }
    if (freqobj[char] > maxcount) {
      maxcount = freqobj[char];
    }
  }
  // Find all characters with max count
  for (let char of str) {
    if (freqobj[char] == maxcount) {
      ans.push(char);
    }
  }
  console.log("Frequency object:", freqobj);
  console.log("Max count:", maxcount);
  return ans;
}
console.log(freq("programing"));

//non repeating value from string
function nonrepeat(str) {
  let charfreq = {};
  for (let char of str) {
    if (charfreq[char]) {
      charfreq[char]++;
    } else {
      charfreq[char] = 1;
    }
  }
  console.log(charfreq);
  for (let char of str) {
    if (charfreq[char] == 1) {
      console.log(char);
    }
  }
}
nonrepeat("level");
