//reverse string - javascript
function reverse(str) {
  return str.split("").reverse().join("");
}
console.log(reverse("hello"));
// // Java
// public static String reverseString(String str) {
//     return new StringBuilder(str).reverse().toString();
// }

// Check Palindrome - javascript
function Palindrome(str) {
  let left = 0;
  let right = str.length - 1;
  while (left < right) {
    if (str[left] !== str[right]) return false;
    left++;
    right--;
  }
  return true;
}
console.log(Palindrome("ananana"));
// //java
// public static boolean isPalindrome(String str) {
//     int left = 0, right = str.length() - 1;
//     while(left < right) {
//         if(str.charAt(left) != str.charAt(right)) return false;
//         left++; right--;
//     }
//     return true;
// }

//count vowels-javascript
function countVowelsConsonants(str) {
  const vowels = "aeiouAEIOU";
  let vowelCount = 0,
    consonantCount = 0;

  for (let char of str.toLowerCase()) {
    if (char >= "a" && char <= "z") {
      if (vowels.includes(char)) vowelCount++;
      else consonantCount++;
    }
  }
  return { vowels: vowelCount, consonants: consonantCount };
}
// // Java
// public static void countVowelsConsonants(String str) {
//     String vowels = "aeiouAEIOU";
//     int vowelCount = 0, consonantCount = 0;

//     for(char ch : str.toCharArray()) {
//         if(Character.isLetter(ch)) {
//             if(vowels.indexOf(ch) != -1) vowelCount++;
//             else consonantCount++;
//         }
//     }
//     System.out.println("Vowels: " + vowelCount + ", Consonants: " + consonantCount);
// }

//Find First Non-Repeating Character - javascript
function nonrepeating(str) {
  let map = new Map();
  //store freq of char of string in map
  for (let char of str) {
    if (map.has(char)) {
      map.set(char, map.get(char) + 1);
    } else {
      map.set(char, 1);
    }
  }
  //getting non repeating
  for (let char of str) {
    if (map.get(char) == 1) return char;
  }
  return null;
}
console.log(nonrepeating("abcasc"));
// //java
// public static Character firstNonRepeating(String str) {
//     Map<Character, Integer> freq = new HashMap<>();

//     for(char ch : str.toCharArray()) {
//         freq.put(ch, freq.getOrDefault(ch, 0) + 1);
//     }

//     for(char ch : str.toCharArray()) {
//         if(freq.get(ch) == 1) return ch;
//     }
//     return null;
// }
