
// Inteference = TypeScript can infer the type of a variable based on its value
let name = "TypeScript";
// //name = 21;    // Error: Type 'number' is not assignable to type 'string'
// //console.log(`Hello, ${name.toUpperCase()}!`);
console.log(`Hello, ${name}!`);



// Explicitly setting the type of a variable
let userID : String | number;
userID = "12345";  // OK
userID = 12345;    // OK
function add(a: number, b: number|string) {
    if (typeof b === 'number') {   // TypeScript now knows b is number here
        return a + b;
    } else {    // TypeScript now knows b is string here  
        return a + b;
    }
}
console.log(add(5, 10));        // Outputs: 15
console.log(add(5, "10"));      // Outputs: 510





