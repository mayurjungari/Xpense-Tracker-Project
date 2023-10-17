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