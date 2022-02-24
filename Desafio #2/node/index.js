const express = require('express')
const app = express()
const port = 3000
const config = {
    host: 'db',
    user: 'root',
    password: 'root',
    database:'nodedb'
};
const mysql = require('mysql')
const connection = mysql.createConnection(config)

const sqlDb = `CREATE DATABASE IF NOT EXISTS nodedb`
connection.query(sqlDb)

const sqlTable = `CREATE TABLE IF NOT EXISTS people(
    name VARCHAR(255) NOT NULL
)`

connection.query(sqlTable)

const sql = `INSERT INTO people(name) values('Matheus')`
connection.query(sql)
connection.end()


app.get('/', (req,res) => {
    const q = `SELECT * FROM people`

    const connection = mysql.createConnection(config)
    
    connection.query(q, (err, results) => {
        if(err) throw err
        
        let body = '<h1>Full Cycle</h1>'
        body += '<ul>'
        results.forEach(person => {
            body += `<li>${person.name}</li>`
        })

        body += '</ul>'
        res.send(body)
    })

    connection.end()   
})

app.listen(port, ()=> {
    console.log('Rodando na porta ' + port)
})

