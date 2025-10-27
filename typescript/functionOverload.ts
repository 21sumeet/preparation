//function overloading = defining multiple signatures for a function

function getvalue( value : number): number;
function getvalue( value : string): string;
function getvalue( value : number | string)
{
    return value;
}

getvalue("hello"); // Outputs: hello
getvalue(21); // Outputs: 21
getvalue(true); // Error: No overload matches this call



function add(a: number, b: number): number;
function add(a: string, b: string): string;
function add(a: any, b: any): any {
 return a + b;
}
console.log(add(5, 10)); // Outputs: 15
console.log(add("Hello, ", "World!")); // Outputs: Hello, World!
console.log(add(5, "Hello")); // Error: No overload matches this call