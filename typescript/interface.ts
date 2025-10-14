//interface is a structure which defines the structure of an object
//it is a way to define a contract in your application
interface user {
  name : String,
  age : Number,
  gender?: String                   //gender? , ? sign values can be given or not, this values are optional .... not compolsory 
}

function abc(obj : user){
  console.log(obj)
}

abc({name : "sumeet" , age : 21 , gender : "male" });
abc({name : "username" , age : 69 });


//extending interface
interface user {
  name : String,
  age : Number,
  gender?: String
}

interface admin extends user{     //in admin interface name , age and gender is extended 
  admin : Boolean;
}

function user(obj : user){
  console.log(obj)
}
function admin(obj : admin){
  console.log(obj)
}

admin({name : "sumeet" , age : 21 , admin: true });
user({name : "onxy" , age : 12})