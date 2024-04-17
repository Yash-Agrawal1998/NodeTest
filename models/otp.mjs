// const object = require('./Base');
// const mongoose = object.getObject();

import { mongoose } from './Base.mjs';

const otpSchema = new mongoose.Schema(
    {
        email_id : {
            type : String,
            required : true,
            unique : true
        },
        otp : {
            type : Number,
            required : true
        },
        created_at: { 
            type: Date,
            expires : 60,
            default: Date.now
        }
    },
    {
        versionKey : false
    }
);

export const otpCollection = mongoose.model('otp', otpSchema);

// module.exports = Otp;