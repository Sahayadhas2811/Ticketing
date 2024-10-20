const Register = require('../Register/registerSchema.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

module.exports = {
    login
}

async function login(body){
    try {
        const password = body.password;
        const findUser = await Register.findOne({email:body.email});

        if(!findUser){
            throw new Error("User not found");
        };

        const isMatch = await bcrypt.compare(password, findUser.password);

        if(!isMatch){
            throw new Error("Incorrect password");
        };

        const token = jwt.sign({userId:findUser._id, 
            userID:findUser.userID,
            userName:findUser.userName,
            email:findUser.email,
            role:findUser.role,
            },
            process.env.SECRET_Key,
            {expiresIn:'1d'}
        );

        console.log(`token: ${token}`)

        return {
            status:'Success',
            message:"Login Successfull",
            token: token,
        }
    } catch (error) {
        throw new Error(error.message);
    }
}