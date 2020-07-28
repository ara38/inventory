
const {Sequelize} = require('sequelize');

const db = new Sequelize({
    dialect: 'sqlite',
    storage: './tmp/DATABASE_644404.db'
});

const initDB = async () =>{
    try{
        await db.authenticate();
        console.log('Connection worked')
    }catch(err){
        console.log('Error! ', err)
    }
}

module.exports = {db, initDB}
  

