const person = {
  name: "Alice",
  age: 30,
  address: {
    city: "New York",
    country: "USA",
  },
};

// Shallow Copy
const shallowCopy = { ...person };
shallowCopy.name = "Bob";
console.log("shallow copy person name:", person.name); // Output: Bob
console.log("shallow copy person name:", person.name); // Output: Alice
shallowCopy.address.city = "Los Angeles";
console.log("shallow copy person address city:", person.address.city); // Output: Los Angeles  :bcoz { },[] ,() are reference types so when we change in shallow copy it will reflect in original object
