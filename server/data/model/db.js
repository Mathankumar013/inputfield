const Sequelize = require('sequelize')
const { DataTypes }=require('sequelize')
const sequelize = new Sequelize('note','root','Mathan@123',{
    host:'localhost',
    dialect:'mysql'
})
sequelize.authenticate().then(()=>{
    console.log("connected successfully")
}).catch(()=>{
    console.log("failed to connect")
})

const userNote = sequelize.define('note',{
    id:{
     type:DataTypes.INTEGER,
     primaryKey:true,
     autoIncrement:true,
    },
    note:{
        type:DataTypes.STRING,
        allowNull:false
    }
}) 
sequelize.sync().then(()=>{
    console.log('running successfully')
}).catch(()=>{
    console.log('failed to run')
})

module.exports= userNote;