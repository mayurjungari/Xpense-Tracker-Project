const path=require('path')
const Sib=require('sib-api-v3-sdk')
require('dotenv').config();

const defaultClient = Sib.ApiClient.instance;
const apiKey = defaultClient.authentications['api-key'];
apiKey.apiKey = process.env.API_KEY;

module.exports.ForgotPage=(req,res)=>{
    console.log(process.env.API_KEY)
    res.sendFile(path.join(__dirname,'../','Views','forgotpassword.html'))
}

module.exports.PostForgotPassword=async(req,res)=>{
    const Email=req.body.email

    const apiInstance = new Sib.TransactionalEmailsApi();
   
    
    const sendSmtpEmail = {
        sender: { email: 'mayurjungari2606@gmail.com' },
        to: [{ email: Email }],
        subject: 'Jay shri ram',
        textContent: 'your otp id 874448!',
      };
      apiInstance.sendTransacEmail(sendSmtpEmail)
      .then((data) => {
        console.log('Email sent successfully!');
        res.json({message :"Email sent succesfully"})
      })
      .catch((error) => {
        console.error('Error sending email:', error);
        res.json({ 'error': error})
      });
    }
    