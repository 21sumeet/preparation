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
console.log("shallow copy person name:", shallowCopy.name); // Output: Bob
console.log("shallow copy person name:", person.name); // Output: Alice
shallowCopy.address.city = "Los Angeles";
console.log("shallow copy person address city:", person.address.city); // Output: Los Angeles  :bcoz nested objects { },[] ,() are reference types so when we change in shallow copy it will reflect in original object

// Deep Copy
const deepCopy = JSON.parse(JSON.stringify(person));
deepCopy.name = "Charlie";
console.log("deep copy person name:", deepCopy.name); // Output: Charlie
console.log("deep copy person name:", person.name); // Output: Alice
deepCopy.address.country = "Canada";
console.log("deep copy person address country:", person.address.country); // Output: USA :bcoz we created a new object in deep copy so changes in deep copy will not reflect in original object

// Assignment - both variables point to the same object
const value = {
  name: "John",
  age: 25,
};

const copy = value;
copy.name = "Doe";
console.log("original value name:", value.name); // Output : Doe : because both value and copy are pointing to same memory location
