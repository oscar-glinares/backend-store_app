const express = require("express");
const app = express();
const PORT = 8080;
const cors = require("cors");
const mysql = require("mysql");
const con = mysql.createConnection({
    host:"localhost",
    user:"root",
    database:"storeapp_sql"
})

//middleware
app.use(express.json())
app.use(cors())

con.connect()

app.listen(PORT, () => console.log("Listening on " + PORT))

app.get("/api/get", (_req, res) => {
    con.query("SELECT * FROM products", (err, rows, _fields) => {
        if(err){
            throw(err)
        }
        res.status(200).send({rows})
    })
})

app.get("/api/get/:id", (req, res) => {
    con.query(`SELECT * FROM products WHERE id = "${req.params.id}"`, (err, rows, _fields) => {
        if(err){
            throw(err)
        }
        res.status(200).send({rows})
    })
})

app.put("/api/put/:id", (req, res) => {
    con.query(`UPDATE products SET amount = "${req.body.amount}" WHERE id ="${req.params.id}"`, (err, rows, _fields)=> {
        if(err){
            throw(err)
        }
        res.status(200).send({rows})
    })
})