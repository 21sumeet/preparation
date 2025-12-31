

function sum(arr:number[]){
    return arr.reduce((sum , acc)=> (sum + acc) , 0);
}
console.log(sum([1,2,3,4]))


type User={
    name :string , 
    age : number,
    alive : boolean,
    location?: string
}
const user:User = {
    name : "sumeet",
    age : 21 , 
    alive : true 
}
console.log(user )


//interfaces 
interface Transaction {
    BuyAccNumber: number;
    SellerAccNumber: number;
}
interface BankAccount {
    AccountNumber: number;
    isActive: boolean; 
    transaction: Transaction[];  // This expects Transaction objects
}
const useraccount: BankAccount = {
    AccountNumber: 1243,
    isActive: true,
    transaction: [  // This should be Transaction objects, not numbers
        { BuyAccNumber: 123, SellerAccNumber: 456 },
        { BuyAccNumber: 789, SellerAccNumber: 101 }
    ]
};
console.log(useraccount);

// Extend interfaces 
interface Book {
    name : string,
    price : number 
}
interface Ebook extends Book{
    duration : number ,
    filesize? :number
}
const book : Ebook = {
    name : "all tomorrow ",
    price : 450 ,
    duration : 21 ,
    filesize : 10
}
console.log(book)

//interface for function
interface Auth {
  username : string;
  password : number ;
  login(username : string ,password : number):void
}
const auth : Auth={
  username :"john",
  password : 1234,
  login(username ,password){
    console.log(username , password)
  }

}

//union 
type Id = number | string ;
function printId(id :Id){
  if(typeof id === "string"){ 
    console.log(id.toUpperCase())
  }else{
    console.log(id)
  }
}
printId("aBc123");

//generic
interface HasAge{
  age : number ;
}
function getOldest<T extends HasAge>(people:T[]):T{
   return people.reduce((oldest, current) => 
    current.age > oldest.age ? current : oldest
  );
}
const people = [{age :30 },{age:40}]
const oldest = getOldest(people);
console.log(oldest); 
