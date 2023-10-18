const path=require('path')
module.exports.ForgotPage=(req,res)=>{
    res.sendfile(path.join(__dirname,'../','Views','forgotpassword.html'))
}