import {config as conf} from "dotenv"
conf();

const _config ={
    port:process.env.PORT,
    databaseUrl:process.env.MONGO_STRING,
    env:process.env.NODE_ENV,
    jwtSecret :process.env.JWT_SECRET,
    frontend_url :process.env.FRONTEND_URL,

}
export const config = Object.freeze(_config)