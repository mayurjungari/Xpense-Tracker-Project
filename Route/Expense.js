const express=require('express')
const router=express.Router()
const userAuthentication=require('../middleware/auth')
const savegetdeleteController=require('../controller/SaveDeleteGet')
router.post('/expense/savedata',userAuthentication.authenticate,savegetdeleteController.saveData)
router.get('/expense/allData',userAuthentication.authenticate,savegetdeleteController.GetAllData)
router.delete('/expense/deleteData/:id',savegetdeleteController.Deletedata)
router.get('/expense',savegetdeleteController.GetMainPage)


module.exports=router