const mongoose = require('mongoose');
 
const breakFixSchema = mongoose.Schema({
    // orderID:{
    //     type:String,
    //     required:[true,"OrderID is required"],
    //     trim:true,
    //     unique:true
    // },
    userID:{
        type:String,
        required:[true, "UserID is required"]
    },
    userName:{
        type:String,
        required:[true, 'UserName is required']
    },
    email:{
        type:String,
        required:[true, 'email is required'],
        trim:true,
    },
    projectType:{
        type:String,
        default:'',
        enum: ['Project Based', 'Non-Project Based'],
        required:[true,"Select the required one"]
    },
    issueDescription:{
        type:String,
        required:[true, "Enter Issue Description"],
    },
    modeOfContact:{
        type:String,
        required:[true, "Select the Mode Of Contact you prefer"],
        default:'',
        erum:['Email', 'Phone']
    },
    supportType:{
        type:String,
        required:[true, "Select the Support Type"],
        default:'',
        enum:['Remote Support', 'Hardware Support']
    },
    requestingFor:{
        type:String,
        required:[true, "Requesting For?"],
        default:'',
        enum:['Self', 'Others']
    },
    otherUserID:{
        type:String,
        trim:true
    }
},
{
    timestamps:true,
    strict:true,
    collection:'BreakFix'
});

// breakFixSchema.pre('save', function(next){
//     if(!this.userID){
//         this.userID = this._id.toString();   
//     }
//     next();
// });
 
const BreakFix = mongoose.model('BreakFix', breakFixSchema);
module.exports = BreakFix;