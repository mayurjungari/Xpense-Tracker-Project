const Account=require('../models/User')
const Xtable=require('../models/expense')
const path=require('path')
const Sequelize=require('sequelize')
const sequelize=require('../util')


module.exports.saveData = async (req, res) => {
    const t= await sequelize.transaction();
    try {
       
       
        
        const { category, description, amount } = req.body;
       
        await Xtable.create({
            CATEGORY: category,
            DESCRIPTION: description,
            AMOUNT: amount,
            accountID: req.user.ID
        },{
            transaction:t,
        });
        const totalExpense=req.user.TotalExpense+parseInt(amount);
        
        await Account.update({ TotalExpense: totalExpense }, { where: { ID: req.user.ID },transaction:t });
        await t.commit();
         res.status(200).send('Data saved');
    } catch (error) {
        await t.rollback();
        console.error('rollback',error);
        res.status(500).send('An error occurred while saving data');
    }
};



module.exports.GetAllData= (req, res) => {
    Xtable.findAll({where:{accountID:req.user.ID}})
        .then((data) => {
            res.json(data);
        })
        .catch((error) => {
            console.error(error);
            res.status(500).send('An error occurred while retrieving data');
        });
}

module.exports.Deletedata=async (req, res) => {
    const itemId = req.params.id;
    const t= await sequelize.transaction();
    const data=await Xtable.findOne({where:{accountID:req.user.ID},transaction :t})

    

    try {
     const p=   await Xtable.destroy({
            where: {
                ID: itemId
            },
                transaction:t,
            
        });
        
        const TotalExpense=req.user.TotalExpense-data.AMOUNT;
     
        await Account.update({ TotalExpense }, { where: { ID: req.user.ID }, transaction: t }); 
          await t.commit();
        res.status(200).send('Row deleted successfully');
    } catch (error) {
        await t.rollback();
        console.error(error);
        res.status(500).send('An error occurred while deleting the row. Please try again.');
    }
}


module.exports.GetMainPage=(req,res)=>{
    res.sendFile(path.join(__dirname,'../','Views','expense.html'))
}