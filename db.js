const mariadb = require('mysql2');

const connection = mariadb.createConnection({
    host:'localhost',
    user:'root',
    password:'1234',
    database:"bookshop",
    dateStrings:true
})

module.exports = connection;