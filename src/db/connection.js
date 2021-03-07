const mysql = require("mysql")

var mysqlConnection = mysql.createConnection({
    host : process.env.HOST,
    user : process.env.USER,
    password : process.env.DB_PASS,
    database : process.env.DB_NAME,
    multipleStatements : true
})

mysqlConnection.connect((err)=>{
    if(!err){
        return console.log("Connected to the database")
    }
    return console.log(err)
})

module.exports = mysqlConnection