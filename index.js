import express from 'express';
import { config } from 'dotenv';
import livekitTokenRouter from './src/routes/livekitToken.route.js';
const app = express();
config({ path: './development.env'})

const port = process.env.PORT || 3000;

app.use("/getRoomToken", livekitTokenRouter);

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})