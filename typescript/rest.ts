// function add(a: number, b: number, c : number): number {
//     return a + b + c;
// }
// console.log(add(5, 10, 15));        // Outputs: 30
// console.log(add(5,4,3,2,1));      // Error: Expected 3 arguments, but got 5.


//rest operator - allows a function to accept an indefinite number of arguments as an array
function add (...nums : number[]) : number{     //rest operator ...nums
  return nums.reduce((a,b) => a + b , 0)      //reduce method is used to reduce the array to a single value
}
console.log(add(5,10,15));        // Outputs: 30
console.log(add(5,4,3,2,1));      // Outputs: 15

function logstatus(...status : string[]){
    console.log(status)   // outputs: [ 'active', 'pending', 'completed' ]
}
logstatus("active" , "pending" , "completed")