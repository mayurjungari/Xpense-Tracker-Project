const Sequelize=require('sequelize');
const sequelize = require('../util')
const path=require('path')
const Account=require('../models/User')
const Xtable=require('../models/expense')
module.exports.LeaderboardPage=(req,res)=>{
    res.sendFile(path.join(__dirname,'../','Views','leaderboard.html'))
}

module.exports.LeaderBoard=async (req,res)=>{
    try {
        const userLeaderBoard = await Account.findAll({
            attributes: [
                'ID',
                'USERNAME',
                [sequelize.fn('SUM', sequelize.col('xtables.AMOUNT')), 'Total_cost']
            ],
            include: [
                {
                    model: Xtable,
                    attributes: []
                }
            ],
            group: ['account.ID'],
            order: [['Total_cost','DESC']]
        });
    
       
        console.log(userLeaderBoard);
        res.json({'userAgregate':userLeaderBoard})
    } catch (error) {
        console.error(error);
    }
    }