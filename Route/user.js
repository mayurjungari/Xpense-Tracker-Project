const express=require('express')
const router=express.Router()
const signupcontroller=require('../controller/signup')
const signincontroller=require('../controller/signin')
const forgotpassController=require('../controller/forgotpass')

router.get('/user',signupcontroller.GetSignUp)
router.post('/signup',signupcontroller.PostSignUp)
router.get('/',signincontroller.GetSignIn)
router.post('/signin',signincontroller.PostSignIn)
router.get('/forgotpass',forgotpassController.ForgotPage)
module.exports=router