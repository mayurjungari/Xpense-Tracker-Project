const express=require('express')
const app=express();
const cors=require('cors')
app.use(cors()); 
const path=require('path')
const bodyparser=require('body-parser')
app.use(bodyparser.urlencoded({extended:false}))
app.use(express.static(path.join(__dirname, 'Public')));
app.use(express.json());
//---------------------------------------
const Razorpay = require('razorpay');

//------------------------------------------------------------

const Sequelize=require('sequelize');
const sequelize = require('./util')

const userroute=require('./Route/user')
const expenseroute=require('./Route/Expense')
const purchaseroute=require('./Route/purchase')
const leaderboardRoute=require('./Route/leaderboardRoute')


 
const Account=require('./models/User')
const Xtable=require('./models/expense')
const Order=require('./models/order')



Account.hasMany(Xtable);
Xtable.belongsTo(Account);

Account.hasMany(Order);
Order.belongsTo(Account);



app.get('/user',userroute)
app.post('/signup',userroute)
app.get('/',userroute)
app.post('/signin', userroute)

app.get('/expense',expenseroute)
   
app.post('/expense/savedata', expenseroute);

app.get('/expense/allData',expenseroute);



app.delete('/expense/deleteData/:id', expenseroute);
app.get('/purchase/premiummembership',purchaseroute)



app.post('/purchase/premiummembership/updatestatus',purchaseroute)

app.get('/showLeaderBoard',leaderboardRoute)

// app.get('/purchase/leaderBoard',async (req,res)=>{
//     try {
//         const users= await Account.findAll({
//             attributes :['ID','USERNAME']
//         })
//         const expenses=await Xtable.findAll({
//             attributes :['accountID','AMOUNT']
//         });
//         console.log(expenses)
//         const  userAgragate={};
//         expenses.forEach((expense)=>{
//             if(userAgragate[expense.accountID])
//             {
//                 userAgragate[expense.accountID]= userAgragate[expense.accountID]+expense.AMOUNT
//             }
//             else{
//                 userAgragate[expense.accountID]=expense.AMOUNT;
//             }

//         })
//         var userLeaderBoard=[];
//         users.forEach((user)=>{
//            userLeaderBoard.push({name:user.USERNAME,Total_cost: userAgragate[user.ID] || 0}) 
//         })
//         userLeaderBoard.sort((a,b)=>b.Total_cost-a.Total_cost)
       
//         res.json({'userAgregate':userLeaderBoard})
        
//     } catch (error) {
//         comsole.log(error)
        
//     }
// })



app.get('/purchase/leaderBoard',leaderboardRoute)





app.use((req,res)=>{
    res.send('not found')
})

sequelize.sync()
  .then(() => {
    console.log(' tables have been synchronized!');
  })
  .catch((error) => {
    console.error('Error synchronizing the database:', error);
  });


app.listen(8000,()=>{
    console.log('is running in port 8000')
})