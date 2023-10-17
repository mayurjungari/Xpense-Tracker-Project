const express=require('express')
const router=express.Router()
const signupcontroller=require('../controller/signup')
const signincontroller=require('../controller/signin')

router.get('/user',signupcontroller.GetSignUp)
router.post('/signup',signupcontroller.PostSignUp)
router.get('/',signincontroller.GetSignIn)
router.post('/signin',signincontroller.PostSignIn)
module.exports=router