const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
    reason:{
        type:String,
        required:[true, 'Reson for the request is required']
    },
    userID:{
        type:String,
        required:[true, 'userID for this request Needed']
    },
    userName:{
        type:String,
        required:[true, 'userName of this request Needed']
    },
    email:{
        type:String,
        required:[true, 'email is requried for this request']
    }

},{
    timestamps:true,
    strict:true,
    collection:'AdminRequest',
})

const AdminPage = mongoose.model('AdminPage', adminSchema);
module.exports = AdminPage;
