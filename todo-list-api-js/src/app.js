import express from 'express';
import { connectDB } from "./database/db.js";
import {CONFIG} from "./config/config.js";
import {todoRouter} from "./routes/todo.routes.js";

const app = express();
app.use(express.json());

app.use("/api", todoRouter);

connectDB().then(()=>{
    app.listen(CONFIG.PORT, ()=>{
        console.log(`Server running at http://localhost:${CONFIG.PORT}`);
    });
}).catch(err=>{
    console.error("Failed to connect to database", err);
})