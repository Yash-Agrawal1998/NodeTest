import mongoose from 'mongoose';

export const mongoConnection = () => {
    return mongoose.connect('mongodb://mongo:27017/', {
        dbName:"myDatabase",
        user:"root",
        pass:"yash-test"
    })
   
}

// module.exports = mongoConnection;