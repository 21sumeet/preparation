// Type Aliases : in TypeScript help to define a custom type by giving name and use multiple times.
type userId = number|string;
function getUserId(Id : userId){
  console.log(Id)
}
function deleteUserId(Id : userId){
  console.log(Id)
}
getUserId(12)
deleteUserId("one")


//example 2
type status = "success" |"denied"|"waiting";
function getstatus(status : status){
    console.log(status);
}
getstatus("success");
getstatus("failed")   //error  bcoz failed is not status