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

// Deep Copy
const deepCopy = JSON.parse(JSON.stringify(person));
deepCopy.name = "Charlie";
console.log("deep copy person name:", deepCopy.name); // Output: Charlie
console.log("deep copy person name:", person.name); // Output: Alice
deepCopy.address.country = "Canada";
console.log("deep copy person address country:", person.address.country); // Output: USA :bcoz we created a new object in deep copy so changes in deep copy will not reflect in original object
