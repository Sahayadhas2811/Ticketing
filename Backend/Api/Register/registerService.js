const Register = require('./registerSchema.js');


module.exports = {
    createReg,
    getReg,
    updateReg,
    deleteReg
}

async function createReg(body){
    if(!body){
        throw new Error('No Data found');
    }

    const findReg = await Register.findOne({userID:body.userID});
    if(!findReg){
        const createReg = new Register({
            userID: body.userID,
            userName : body.userName,
            email : body.email,
            password : body.password,
            confirmPass : body.confirmPass,
            role:body.role,
        });
        
        const userData = await createReg.save();
        console.log('userData',userData);
        return {message:"Success", data:userData};
    }else {
        return {message:"User already exists"};
    }
};


async function getReg(id){
    try {
        const getUser = await Register.aggregate(
            [{$match:{userID:id}},
                {$project:{
                    userName:1,
                    email:1,
                    role:1,
                }}]
        );
        if(getUser.length === 0){
            return {message: "No user found"};
        }
        return {message:"data fetched", data:getUser}
    } catch (error) {
        return {message:error.message}
    }
};

async function updateReg(id, body){
    console.log("body:", body);
    try {

        const updateRegister = {
                userName:body.userName,
                email:body.email,
                role:body.role,
        };

        if(body.password){
            updateRegister.password = body.password;
        }
        const putReg = await Register.findOneAndUpdate(
            {userID:id},
            {$set:updateRegister},
            {new:true}
        );

        if(!putReg){
            return {message:"User not found"}
        }
        return ({message:"updated successfuly", data:putReg })
    } catch (error) {
        return {message: error.message};
    }
};

async function deleteReg(id){
    if(!id){
        throw new Error('id found missing');
    };

    try {
        const deleteUser = await Register.deleteOne({_id:id});
        if(deleteUser.deletedCount === 0){
            throw new Error("No data found");
        }else{
            return({message:"deleted Successfully"})
        }
    } catch (error) {
        return {message:error.message};
    }

};