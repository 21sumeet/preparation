import express from"express";
const app = express();

app.get("/", (req , res)=>{
    res.json({message:"hello from ebook api backend"})
})

export default app ;

