
//generic function : define a function that can work with different data types
// T is a placeholder for a data type that will be specified when the function is called

function getFirstele<T>(arr: T[]): T {
    return arr[0];
}
const result = getFirstele([1, 2, 3]);
console.log(result);  // Outputs: 1

const ranks = getFirstele(["gold", "silver", "bronze"]);
console.log(ranks);  // Outputs: gold


//multiple generic parameters
function mergeObjects<T, U>(obj1: T, obj2: U): T & U {
    return { ...obj1, ...obj2 };
}
const merged = mergeObjects({ name: "Alice" }, { age: 30 });
console.log(merged);  // Outputs: { name: 'Alice', age: 30 }

