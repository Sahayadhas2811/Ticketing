const AdminPage = require('./adminSchema');
const {transport, emailID} = require('../../../util/mailConfig/sendEmail')

module.exports = {
    createAdmin
}

async function createAdmin(body){
    const findAccess = await AdminPage.findOne({userID:body.userID});
    if(!findAccess){
        const createAccess = new AdminPage({
            userID:body.userID,
            reason:body.reason,
            userName:body.userName,
            email:body.email
        })
        await createAccess.save();

        const requestMail = {
            from:createAccess.email,
            to:emailID,
            subject:`${createAccess.userName} is requested for Admin Access`,
            text:`Hi Team, \n\n
            UserName: ${createAccess.userName}\n
            Reason for Request: ${createAccess.reason}\n\n
            Note:if you found it is valid, change his role as Admin in DB`
        }

        try {
            await transport.sendMail(requestMail);
        } catch (error) {
            return ({message:error.message})
        }

        return {message:'Request Send Successfully', data:createAccess}
    }else{
        return ({message:'Failed to send a Request', error:error.message})
    }
};

