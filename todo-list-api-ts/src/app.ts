import express from 'express';
import { connectDB } from "./database/db";
import { CONFIG } from "./config";
import { todoRouter } from "./routes";
import { authRouter } from "./routes";

const app = express();

app.use(express.json());
app.use('/api', todoRouter);
app.use('/api/auth', authRouter);

connectDB().then(() => {
    app.listen(CONFIG.PORT, () => {
        console.log(`Server running at http://localhost:${CONFIG.PORT}`);
    });
}).catch(err => {
    console.error('Failed to connect to database', err);
    process.exit(1);
});