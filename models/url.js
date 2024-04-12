const mongoose = require('mongoose');

const urlSchema = new mongoose.Schema({
    short_id : {
        type : String,
        required : true,
        unique : true
    },
    redirect_url : {
        type : String,
        required : true
    },
    visit_history : [
        {
            time_stamp : {
                type : Number
            }
        }
    ]
},{timestamps : true, versionKey : false});

const Url = mongoose.model('url', urlSchema);

module.exports = Url;