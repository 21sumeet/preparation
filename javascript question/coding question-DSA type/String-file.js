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

//Anagram Check- JavaScript
function areAnagrams(str1, str2) {
  if (str1.length !== str2.length) return false;

  const sorted1 = str1.split("").sort().join("");
  const sorted2 = str2.split("").sort().join("");
  return sorted1 === sorted2;
}
// // Java
// public static boolean areAnagrams(String str1, String str2) {
//     if(str1.length() != str2.length()) return false;

//     char[] arr1 = str1.toCharArray();
//     char[] arr2 = str2.toCharArray();
//     Arrays.sort(arr1);
//     Arrays.sort(arr2);
//     return Arrays.equals(arr1, arr2);
// }

// Remove Duplicates - javascript
function removeduplicate(str) {
  let seen = new Map();
  let result = "";
  for (let char of str) {
    if (!seen.has(char)) {
      seen.set(char);
      result += char;
    }
  }
  return result;
}
console.log(removeduplicate("abcabdef"));
// //java
// public static String removeDuplicates(String str) {
//     Set<Character> seen = new HashSet<>();
//     for(char ch : str.toCharArray()) {
//         seen.add(ch);
//     }

//     StringBuilder result = new StringBuilder();
//     for(char ch : seen) {
//         result.append(ch);
//     }
//     return result.toString();
// }

// Most Frequent Character- JavaScript
function mostFrequentChar(str) {
  const freq = new Map();
  let maxChar = "";
  let maxCount = 0;

  for (let char of str) {
    const count = (freq.get(char) || 0) + 1;
    freq.set(char, count);

    if (count > maxCount) {
      maxCount = count;
      maxChar = char;
    }
  }
  return maxChar;
}
// // Java
// public static char mostFrequentChar(String str) {
//     Map<Character, Integer> freq = new HashMap<>();
//     char maxChar = ' ';
//     int maxCount = 0;

//     for(char ch : str.toCharArray()) {
//         int count = freq.getOrDefault(ch, 0) + 1;
//         freq.put(ch, count);

//         if(count > maxCount) {
//             maxCount = count;
//             maxChar = ch;
//         }
//     }
//     return maxChar;
// }

// convert single char uppercase tolowercase and lowercase to uppercase  : Hello World -> hELLO wORLD
function convertcase(str) {
  let result = "";
  for (let char of str) {
    if (char === char.toUpperCase()) {
      result += char.toLowerCase();
    } else {
      result += char.toUpperCase();
    }
  }
  return result;
}
console.log(convertcase("JavaScript"));
// //java
// public static String toggleCase(String str) {
//         StringBuilder result = new StringBuilder();

//         for(int i = 0; i < str.length(); i++) {
//             char ch = str.charAt(i);

//             if(Character.isUpperCase(ch)) {
//                 result.append(Character.toLowerCase(ch));
//             } else if(Character.isLowerCase(ch)) {
//                 result.append(Character.toUpperCase(ch));
//             } else {
//                 result.append(ch);  // Keep numbers, symbols unchanged
//             }
//         }

//         return result.toString();
// }

//String Rotation Check - javascript
function isRotated(str1, str2) {
  if (str1.length !== str2.length) return false;
  return (str1 + str2).includes(str2);
}
console.log(isRotated("waterbottle", "erbottlewat"));
// //java
// public static boolean isRotated(String str1 , String str2){
//         if(str1.length()!=str2.length()) return false;
//         return (str1 + str1).contains(str2);
// }

//revserse words , not charachter - javascript
function reversewords(str) {
  //simple way
  console.log(str.split(" ").reverse().join(" "));

  //different way
  let words = str.split(" ");
  let result = "";
  for (let i = words.length - 1; i >= 0; i--) {
    result += words[i] + " ";
  }
  console.log(result);
}
reversewords("hello world from sumeet"); //sumeet from world hello
