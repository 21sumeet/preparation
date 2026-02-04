//index signature =You don’t know all the property names in advance But you know the type of the keys and values (structure)
interface indexsignature{
    [index :string] :number|boolean|string
}
const indexsignature :indexsignature ={
    verfiyed :true
}
console.log(indexsignature)

type UserById = {
  [id: number]: string;
};

const users: UserById = {};
users[1] = "Sumeet";
users[2] = "Rahul";
console.log(users)