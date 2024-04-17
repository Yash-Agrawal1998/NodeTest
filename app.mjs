import express from 'express';
import cors from 'cors';
import { mongoConnection } from './mongoConnection.js';
import { otpRoute } from './routes/otp.mjs';
import { userRoute } from './routes/user.mjs';

const app = express();
const PORT = 8000;

app.use(cors());
app.use(express.json({extended : false}));

mongoConnection().then(() => console.log("MongoDb connected"))
.catch(error => console.log('Mongo db error', error));

app.use('/users', userRoute);
// app.use('/url', urlRoute);
app.use('/otp', otpRoute);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});



