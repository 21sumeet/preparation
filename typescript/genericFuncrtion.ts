
//generic function : define a function that can work with different data types
// T is a placeholder for a data type that will be specified when the function is called

function getFirstele<T>(arr: T[]): T {
    return arr[0];
}
const result = getFirstele([1, 2, 3]);
console.log(result);  // Outputs: 1

const ranks = getFirstele(["gold", "silver", "bronze"]);
console.log(ranks);  // Outputs: gold

