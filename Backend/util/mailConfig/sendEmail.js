const nodemailer = require('nodemailer');
const dotenv = require('dotenv');

dotenv.config();

const emailID = process.env.EMAILID;
const adminEMail = process.env.ADMINMAIL;
const emailPass = "ntzrvkuitvgdmihh"

const transport = nodemailer.createTransport({
    host:'smtp.gmail.com',
    secure:true,
    port:465,
    auth:{
        user:emailID,
        pass:emailPass,
    }
});

console.log("emailID:", emailID);
console.log("adminMail", adminEMail);

module.exports = {
    transport,
    emailID,
    adminEMail
}