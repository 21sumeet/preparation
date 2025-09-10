const cart = [
  { name: "shoes", price: 1200, quantity: 2 },
  { name: "pant", price: 900, quantity: 3 },
  { name: "shirt", price: 500, quantity: 2 },
];

//REDUCE METHOD : it reduces the array to a single value and it takes two arguments accumulator and current value
// acc = accumulator , prod = current value , 0 = initial value of accumulator
const price = cart.reduce((acc, prod) => acc + prod.price * prod.quantity, 0);
console.log(price);

//---------------------------------------------------------------------------------------------------------------
//reduce method can be also used for counting the occurrences of elements in an array
const fruits = [
  "apple",
  "banana",
  "orange",
  "apple",
  "orange",
  "banana",
  "apple",
];

const fruitcount = fruits.reduce((acc, fruit) => {
  if (acc[fruit]) {
    acc[fruit] += 1;
  } else {
    acc[fruit] = 1;
  }
  return acc;
}, {});

console.log(fruitcount); //{ apple: 3, banana: 2, orange: 2 }
