const Account=require('../models/User')
const Xtable=require('../models/expense')
const path=require('path')

module.exports.saveData = async (req, res) => {
    try {
       
        
        const { category, description, amount } = req.body;
        

       

        await Xtable.create({
            CATEGORY: category,
            DESCRIPTION: description,
            AMOUNT: amount,
            accountID: req.user.ID
        });
        const totalExpense=req.user.TotalExpense+amount;
        await Account.update({ TotalExpense: totalExpense }, { where: { ID: req.user.ID } });


        res.status(200).send('Data saved');
    } catch (error) {
        console.error(error);
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

    try {
        await Xtable.destroy({
            where: {
                ID: itemId
            }
        });

        res.status(200).send('Row deleted successfully');
    } catch (error) {
        console.error(error);
        res.status(500).send('An error occurred while deleting the row. Please try again.');
    }
}


module.exports.GetMainPage=(req,res)=>{
    res.sendFile(path.join(__dirname,'../','Views','expense.html'))
}