
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


//real world example
interface User {
    id: number;
    name: string;
}

interface Product {
    id: number;
    title: string;
    price: number;  
}
function getEntityById<T extends { id: number }>(entities: T[], id: number): T | undefined {
    return entities.find(entity => entity.id === id);
}   
const users: User[] = [
    { id: 1, name: "Alice" },
    { id: 2, name: "Bob" }
];
const user = getEntityById(users, 1);
console.log(user);  // Outputs: { id: 1, name: 'Alice' }


