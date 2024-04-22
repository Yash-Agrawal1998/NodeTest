import mongoose from "mongoose";

export const mongoConnection = async () => {
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URL}/user`);
        console.log('MONGODB connected successfully!!')
    } catch(error) {
        console.log('MONGODB conection error : ', error);
        process.exit(1);
    }
}
