const Account=require('../models/User')
const jwt=require('jsonwebtoken')

module.exports.authenticate=(req,res,next)=>{
    try {
        const token =req.header('Authorization');
        console.log(token)
        const tokenobject=jwt.verify(token,'Mayur@123')
        console.log('id------',  tokenobject.ID)
        Account.findByPk(tokenobject.ID).then(user=>{
            console.log(user);
            req.user=user;
            next();
        })

        
    } catch (error) {
        console.log(error)
        return res.status(401).json({success :false})
         
    }
}

