const BreakFix = require('./breakFixSchema');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();
const {transport, emailID, adminEMail} = require('../../../util/mailConfig/sendEmail')

module.exports = {
    createBreakFix,
    getTicket,
    updateTicket,
    deleteTicket,
    getAllTicket
};


 
async function createBreakFix(body){
    console.log('body:', body);
        const createTicket = new BreakFix({
            userID:body.userID,
            userName:body.userName,
            email:body.email,
            projectType:body.projectType,
            issueDescription:body.issueDescription,
            modeOfContact:body.modeOfContact,
            supportType:body.supportType,
            requestingFor:body.requestingFor,
            otherUserID:body.otherUserID,
            ticketsDetail:body.ticketsDetail
        })
        await createTicket.save();

        // NodeMailer

        const ticketsDetail = await getTicket(body.userID)

        const userMail = {
            from:emailID,
            to:createTicket.email,
            subject:`Ticket Raised, ORDER ID: ${ticketsDetail._id}`,
            html:`<div>
            <h1 style="text-align: center; border-bottom: 6px solid rgb(33, 100, 177);">Ticketer</h1>
        <div style="border: 2px solid gray; border-radius: 20px;box-shadow: 0 4px 10px rgba(1, 1, 1, 0.5);background-color:whitesmoke; color:  rgb(33, 100, 177);padding-left: 20px;width: 97%;">
            <p>Hi ${createTicket.userName}\n\n</p>  
            <p style="margin-left: 40px;">The following information confirms the successful creation of your ticket:\n</p>    
            <p style="margin-left: 40px;"><b>OrderID:</b>${createTicket._id}\n</p>  
            <p style="margin-left: 40px;"><b>Project Type:</b>${createTicket.projectType}\n</p>    
            <p style="margin-left: 40px;"><b>Issue Description:</b>${createTicket.issueDescription}\n</p>
            <p style="margin-left: 40px;"><b>Mode Of Contact:</b> ${createTicket.modeOfContact}\n</p>
            <p style="margin-left: 40px;"><b>Support Type:</b> ${createTicket.supportType}\n</p>
            <p style="margin-left: 40px;"><b>Requesting for:</b>${createTicket.requestingFor}\n</p>
            <p style="margin-left: 40px;"><b>Other User ID:</b>${createTicket.otherUserID}\n\n</p>
            <p style="margin-left: 40px;"><b>Contact: XXXX XXXX XXXX</b></p>
            <p>Thanks,\n</p>
            <p><b><i>Support Team</i></b></p>
        </div>
        </div>`
        };

        const adminMail = {
            from:emailID,
            to:adminEMail,
            subject:`Ticket Raised by ${createTicket.userName} as orderID: ${createTicket._id}`,
            html:`<div>
        <h1 style="text-align: center; border-bottom: 6px solid rgb(33, 100, 177);">Ticketer</h1>
        <div style="border: 2px solid gray; border-radius: 20px;box-shadow: 0 4px 10px rgba(1, 1, 1, 0.5);background-color:whitesmoke; color:  rgb(33, 100, 177);padding-left: 20px;width: 97%;">
            <p> Hi Team,</p>
            <p style="margin-left:40px;">Received a new ticket order ID.: ${createTicket._id}\n</p>
            <p style="margin-left: 40px;">The following information is provided below:\n\n</p>
            <p style="margin-left: 40px;"><b>Project Type:</b> ${createTicket.projectType}\n</p>
            <p style="margin-left: 40px;"><b>Issue Description:</b> ${createTicket.issueDescription}\n</p>
            <p style="margin-left: 40px;"><b>Requested on:</b></p>
            <p style="margin-left: 40px;"><b>Mode Of Contact:</b> ${createTicket.modeOfContact}\n</p>
            <p style="margin-left: 40px;"><b>Support Type: </b>${createTicket.supportType}\n</p>
            <p style="margin-left: 40px;"><b>Requesting for:</b> ${createTicket.requestingFor}\n</p>
            <p style="margin-left: 40px;"><b>Other User ID:</b> ${createTicket.otherUserID}\n\n</p>
            <p style="margin-left: 40px;"><b>Notes:</b></p>
            <p>Regards,\n</p>
            <p><b><i>Super Admin Team</i></b></p>
        </div>
       </div>`
        };

        try {
            await Promise.all([
                transport.sendMail(userMail),
                transport.sendMail(adminMail)
            ]);
            console.log("successfuly mail sent")
            // return({message:'Mail Send'});
        } catch (mailError) {
            console.error("Error sending emails:", mailError);
            throw new Error("Failed to send email notifications");
        }

        return {message:'Created Successfully', data:createTicket};
   
};


 
async function getTicket(userID){
    try {
        if (!userID) {
            throw new Error("userID is required");
        }
        // const objectId = new mongoose.Types.ObjectId(id)
        const getDetail = await BreakFix.aggregate([
            {$match:{userID:userID}},
            {$project:{
                _id:1,
                userID:1,
                userName:1,
                email:1,
                projectType:1,
                issueDescription:1,
                modeOfContact:1,
                supportType:1,
                requestingFor:1,
                otherUserID:1,
                ticketsDetail:1
            }}
        ]);
        if (getDetail.length === 0) {
            throw new Error("No ticket found with the provided ID");
        }
        return {message:"data fetched successfully", data:getDetail}
    } catch (error) {
        throw new Error(error.message);
    }
};

async function getAllTicket(){
    try {
        const getData = await BreakFix.find({});
        console.log("GetTickets:", getData)
        return {message:'Success', data:getData}
    } catch (error) {
        return {message:error.message}
    }
}
 
async function updateTicket(id, body){
    console.log("body;", body);
    try {
        const update = await BreakFix.findOneAndUpdate({_id:id},
            {$set:{
                projectType:body.projectType,
                issueDescription:body.issueDescription,
                modeOfContact:body.modeOfContact,
                supportType:body.supportType,
                requestingFor:body.requestingFor,
                ticketStatus:body.ticketStatus,
            }},
            {new:true}
        );
        if (!update) {
            throw new Error("Ticket not found, check ID");
        }else{
            return {message:"updated successfully", data:update}
        }
    } catch (error) {
        throw new Error("update failed, check ID")
    }
};
 
async function deleteTicket(id){
    if(!id){
        throw new Error("Id found missing")
    }
 
    try {
        const deleteTick = await BreakFix.deleteOne({_id:id});
        if(deleteTick.deletedCount === 0){
            throw new Error('Id found wrong, or nothing there to delete')
        }else{
            return {message:"Deleted Successfully"}
        }
    } catch (error) {
        throw new Error(error.message)
    }
 
};