import express from 'express';
import { config } from 'dotenv';
import livekitTokenRouter from './src/routes/livekitToken.route.js';
import cors from 'cors'
const app = express();
config({ path: './development.env'})

const port = process.env.PORT || 3000;

app.use(cors())
app.use("/getRoomToken", livekitTokenRouter);

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})