const unionarr : (string|number)[] = ["hello" , "world", 12];
unionarr.push("hello")
const filtered =unionarr.filter((val)=> val==="hello");
console.log(filtered)

console.log(typeof undefined); //undefine
console.log(typeof []); //object
console.log(typeof NaN); //number

const str :string = "hello typescript";
console.log(str.startsWith("h"));
console.log(str.indexOf("h"));

const data :unknown ="chai";
const datastring :string = data as string;
console.log(datastring.length)

//typeguard - typescript will check values type and treat them based on that
// function print(value :string| number){
//     console.log(value.toUppercase())  //this will give error
// }
function print(value: string | number) {
  if (typeof value === "string") {
    console.log(value.toUpperCase());
  } else {
    console.log(value.toFixed(2));
  }
}

//object with type defined
type artist ={
    name : string,
    art : string,
    alive : boolean,
    phone :number
}
let sam : artist={
    name : "sam",
    art:"painter",
    alive:true,
    phone:9988998899
}
console.log(sam)

//spread/rest operator
function rest(b:number,...a:number[]):void{
    console.log(a ,b);
}
rest(5,1,2,3,4)

function sum(...arr: number[]): void {
  console.log(arr)
  const total = arr.reduce((acc, curr) => acc + curr, 0);
  console.log(total);               // output 15
}
sum(1,2,3,4,5) 

//promise 
const p = new Promise((resolve, reject) => {
  resolve("success")
})
p.then(res => {})
 .catch(err => {})
 
//promise methods
//Promise.all() → all success
// Promise.race() → first settled
// Promise.any() → first success
// Promise.allSettled() → all results

//symbols -used for making Unique and immutable keys.
const id = Symbol("id")

//optional chaining
const user = {
  profile: {
    address: {
      city: "Mumbai"
    }
  }
}
console.log(user?.profile?.address?.city);

//Set in typescript = used to save unique values
const duplicateArr : number[] = [1 ,2,3,4,4,5];
const set:Set<number> = new Set(duplicateArr);
console.log(set);
console.log(set.has(1));
// set.has(1)    // true
// set.delete(2)
// set.size     // number of elements
// set.clear()  // remove all

//Map in typescript = used to save values with index
const usermap :Map< string , number>= new Map();
usermap.set("sumeet" , 21);
usermap.set("rahul" , 23);
console.log(usermap)

// Tuple type
let person: [string, number, boolean];
person = ["John Doe", 30, true];
console.log(person)

//OOPS -typescript
//class and object
class Person {
    public name:string
    public age:number
    //private password :string
    #password :string  //# is used to complete hide confidential data 
    constructor(name:string , age:number , password : string){
        this.name = name;
        this.age = age;
        this. #password = password
    }
}
const user1 = new Person("john" , 50 ,"john123");
console.log(user1)

//encapsulation
class BankAccount{
    public name : string
    private balance : number
    constructor(name : string ){
        this.name = name;
        this.balance = 0 
    }
    deposit(amount :number){
        this.balance +=amount;
    }
    getbalance(){
        return `${this.name} have ${this.balance} amount left in account`
    }
}
const acc = new BankAccount("ambani");
acc.deposit(101);
console.log(acc.getbalance())                                             

//enum = only giving values are allowed and accessed
enum Direction {
  Up,
  Down,
  Left,
  Right
}

let move = Direction.Left;
console.log(move)

//namespace -maybe its not used much after introduction to modules
namespace Demo {
  const x = 10;        // private
  export const y = 20; // public
}
console.log(Demo.y)

// //api call in typescript 
// interface CreateUserPayload {
//   name: string;
//   email: string;
// }
// async function createUser(payload: CreateUserPayload): Promise<User> {
//   const res = await fetch("https://jsonplaceholder.typicode.com/users", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json"
//     },
//     body: JSON.stringify(payload)
//   });
//   return res.json();
// }

//super keyword = used to access parent class methods and variables
class Animal {
  speak() {
    console.log("Animal makes a sound");
  }
}
class Dog extends Animal {
  speak() {
    super.speak(); // parent method
    console.log("Dog barks");
  }
}
const dog = new Dog();
dog.speak();

