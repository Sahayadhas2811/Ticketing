const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const registerSchema = new mongoose.Schema({
    userID:{
        type:String,
        required:[true, "Enter the Reg Number"],
        trim:true,
        unique:true,
    },
    userName:{
        type:String,
        required:[true, "Enter the UserName"],
        trim:true,
    },
    email:{
        type:String,
        required:[true, "Enter Email"],
        trim:true,
        set:v => v.toLowerCase(),
        unique:true,
    },
    password:{
        type:String,
        required:[true, "Enter Your Password"],
        trim:true
    },
    confirmPass:{
        type:String,
        required:[true, "ReEnter the Password"],
        trim:true,
        validate:{
            validator: function(value){
                return value === this.password
            }
        },
        message:'password not matching'
    },
    role:{
        type:String,
        trim:true,
        default:'User',
        enum:["User", "Admin"],
    },
    isActive:{
        type:String,
        default:"Pending",
        enum:['Pending', 'Active']
    }

},{
    timestamps:true,
    strict:true,
    collection:"RegisteredUser"
});

registerSchema.pre('save', async function (next){
    if(!this.isModified('password')){
        return next()
    }

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    this.confirmPass = undefined;
    next()
    
});

registerSchema.methods.matchPassword = async function(enteredPassword){
    return await bcrypt.compare(enteredPassword, this.password)
}

const Register = mongoose.model('Register', registerSchema);
module.exports = Register;

