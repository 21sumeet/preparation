const cart = [
  { name: "shoes", price: 1200, quantity: 2 },
  { name: "pant", price: 900, quantity: 3 },
  { name: "shirt", price: 500, quantity: 2 },
];

//REDUCE METHOD : it reduces the array to a single value and it takes two arguments accumulator and current value
// acc = accumulator , prod = current value , 0 = initial value of accumulator
const price = cart.reduce((acc, prod) => acc + prod.price * prod.quantity, 0);
console.log(price);
