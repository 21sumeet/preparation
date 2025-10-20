// Entries - Using the entries() method to get index-value pairs from an array

const names = ["rohit", "virat", "rahul", "sachin"];
for (const [index, name] of names.entries()) {
  console.log(index, name);
}
// Output:
// 0 'rohit'
// 1 'virat'
// 2 'rahul'
// 3 'sachin'

const number = [21, 34, 56, 78, 90];
for (const [index, value] of number.entries()) {
  console.log(index, value);
}
// Output:
// 0 21
// 1 34
// 2 56
// 3 78
// 4 90

const string = "HELLO";
for (const [index, char] of string.split("").entries()) {
  console.log(index, char);
}
// Output:
// 0 'H'
// 1 'E'
// 2 'L'
// 3 'L'
// 4 'O'
