const express = require("express")
const data = require("../file/user.json")
const mysqlConnection = require("./db/connection")
const app = express()

const port = process.env.PORT || 3000

app.get("/" , (req , res)=>{
    if(data) {
       switch (data.task) {
           case "add":
               const query = `INSERT INTO ${data.operation.table} SET ?`
               mysqlConnection.query(query , data.operation.data , (err , rows)=>{
                    if(err) {
                        return res.send(err)
                    } 
                    res.send("Added")
               })
               break;  
            case "read":
                var readQuery;
                if (data.operation.data) {
                        readQuery = `SELECT * FROM ${data.operation.table} WHERE value = ${data.operation.data.value}`
                }
                else {
                        readQuery = `SELECT * FROM ${data.operation.table}`
                }
                mysqlConnection.query(readQuery , (err , rows)=>{
                        if(err) {
                            return res.send(err)
                        } 
                        res.send(rows)
                })
                break;
            case "update":
                const updateQuery = `UPDATE ${data.operation.table} SET value=${data.operation.data.updatedValue} WHERE value=${data.operation.data.value}`
                mysqlConnection.query(updateQuery , (err , rows)=>{
                    if(err) {
                        return res.send(err)
                    } 
                    res.send(rows)
                })
                break;
            default:
                res.send({
                    error : "Invalid Task"
                })
                break;
       }
    }
})

app.listen(port , ()=>{
    console.log(`App is on port ${port}`)
})