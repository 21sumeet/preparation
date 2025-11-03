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

//make deep copy function with array and nested objects
function deepClone(obj) {
  if (obj === null || typeof obj !== "object") {
    return obj; // Return the value if obj is not an object
  }

  const clone = Array.isArray(obj) ? [] : {};
  for (const key in obj) {
    clone[key] = deepClone(obj[key]);
  }
  return clone;
}
const original = {
  name: "Eve",
  hobbies: ["reading", "traveling"],
  address: {
    city: "Miami",
    zip: 33101,
  },
};
const cloned = deepClone(original);
cloned.hobbies.push("swimming");
cloned.address.city = "Orlando";
console.log("original hobbies:", original.hobbies); // Output: ["reading", "traveling"]
console.log("original address city:", original.address.city); // Output: Miami
console.log("cloned hobbies:", cloned.hobbies); // Output: ["reading", "traveling", "swimming"]
console.log("cloned address city:", cloned.address.city); // Output: Orlando
