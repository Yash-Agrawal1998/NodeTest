import express from 'express';
import cors from 'cors';
import { otpRoute } from './routes/otp.mjs';
import { userRoute } from './routes/user.mjs';
import { mongoConnection } from './database/connection.mjs';
import dotenv from 'dotenv';

const app = express();

dotenv.config({
    path : '/app/envs/env'
})

app.use(cors());
app.use(express.json({extended : false}));
mongoConnection();

app.use('/users', userRoute);
app.use('/otp', otpRoute);

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});



