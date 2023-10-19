const path=require('path')
const uuid=require('uuid')
const Sib=require('sib-api-v3-sdk')
require('dotenv').config();


const defaultClient = Sib.ApiClient.instance;
const apiKey = defaultClient.authentications['api-key'];
apiKey.apiKey = process.env.API_KEY;
const apiInstance = new Sib.TransactionalEmailsApi();

const ForgotPasswordRequest=require('../models/forgatpassword')
const Account=require('../models/User')

module.exports.ForgotPage=(req,res)=>{
    console.log(process.env.API_KEY)
    res.sendFile(path.join(__dirname,'../','Views','forgotpassword.html'))
}
//------------------------------------------------------------------------------

module.exports.PostForgotPassword=async(req,res)=>{
    const Email=req.body.email;
   const data= await Account.findOne({where:{Email}})
   console.log(data)
if(data)
{  
     try{ const uuidToken=uuid.v4();
     await ForgotPasswordRequest.create({
        UUID:uuidToken,
        isActive:true,
        accountID:data.ID,
 })
    const sendSmtpEmail = {
        sender: { email: 'mayurjungari2606@gmail.com',name:'MJ pvt LTD' },
        to: [{ email: Email }],
        subject: 'PASSWORD RESET REQUEST',
        htmlContent: `Click the following link to reset your password: <a href="http://localhost/resetpassword/${uuidToken}">Reset Password Link</a>`,
      };
      apiInstance.sendTransacEmail(sendSmtpEmail)
      .then((data) => {
        console.log('Email sent successfully!');
        res.status(200).json({message :"Email sent succesfully"})
      })}
      catch(error) {
        console.error('Error sending email:', error);
        res.status(500).json({ 'error': error,message:'Email cannot be send'})
      };}

else{
     res.status(404).json({message:'used registered Email'})
}
    }