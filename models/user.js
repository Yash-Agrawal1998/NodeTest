const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
    {
        first_name : {
            type : String,
            required : true
        },
        last_name : {
            type : String,
            required : true
        },
        email_id : {
            type : String,
            required : true,
            unique : true
        },
        job_title : {
            type : String,
            required : true,
        },
        password : {
            type : String,
            required : true
        }
    },
    {
        versionKey : false
    }
);

const User = mongoose.model('user_data', userSchema);

module.exports = User;