const express = require('express');
const userRoute = require('./routes/user');
const urlRoute = require('./routes/url');
const cors = require('cors');
const mongoConnection = require('./mongoConnection');

const app = express();
const PORT = 8000;

app.use(cors());
app.use(express.json({extended : false}));

mongoConnection().then(() => console.log("MongoDb connected"))
.catch(error => console.log('Mongo db error', error));

app.use('/users', userRoute);
app.use('/url', urlRoute);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});



