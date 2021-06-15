const dbConfig = require("../config/db.config.js");
const Sequelize = require("sequelize")
const con = new Sequelize(dbConfig.DB,dbConfig.USER, dbConfig.PASSWORD,{
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    operatorAliases:false,
    pool:{
        max:dbConfig.pool.max,
        min:dbConfig.pool.min,
        acquire:dbConfig.pool.acquire,
        idle:dbConfig.pool.idle
    },
    logging:false
})

const db = {};

db.Sequelize = Sequelize;
db.con = con;

db.Event = require("./Event.js")(con,Sequelize)

module.exports = db;