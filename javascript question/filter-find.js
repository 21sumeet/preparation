const users = [
  { id: 1, name: "John", age: 20 },
  { id: 2, name: "bane", age: 30 },
  { id: 3, name: "peter", age: 25 },
  { id: 4, name: "bruce", age: 30 },
  { id: 5, name: "clark", age: 20 },
];

//filter : it returns all the matches
const filteredusers = users.filter((user) => user.age === 30);
console.log(filteredusers);

//find : it returns the first match
const finduser = users.find((user) => user.age === 30);
console.log(finduser);
