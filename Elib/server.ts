import app from "./src/app.ts";
import { config } from "./config/config.ts";
import connectDB from "./config/db.ts";

function startServer(){
    const port = config.port || 3000;
    connectDB();
    app.listen(port , ()=>{
        console.log("server is running at " + port)
    })
}
startServer();