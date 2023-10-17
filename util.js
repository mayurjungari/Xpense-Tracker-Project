const Sequelize=require('sequelize');
const sequelize = new Sequelize('trackerexpense', 'root', 'Mayur@123', {
    host: 'localhost',
    dialect: 'mysql', 
  });

  module.exports=sequelize