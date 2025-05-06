import express from 'express';
import { connectDB } from "./src/database/db";
import {CONFIG} from "./src/config";
import {router} from "./src/routes";

const app = express();

connectDB().then(()=> {
    app.listen(CONFIG.PORT, () => {
        console.log(`Server running at http://localhost:${CONFIG.PORT}`);
    })
}).catch(err=>{
    console.error('Failed to connect to database', err);
    process.exit(1);
})

app.use(express.json());
app.use('/api', router);