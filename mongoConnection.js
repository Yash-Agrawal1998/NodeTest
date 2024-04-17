import mongoose from 'mongoose';
import { mongoConnectionCredetials, mongoConnectionUrl } from '../config/config.mjs';

export const mongoConnection = () => {
    return mongoose.connect(mongoConnectionUrl, mongoConnectionCredetials)
   
}
