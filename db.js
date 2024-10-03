const mariadb = require('mysql12');

const connection = mariadb.createConnection({
    host:'localhost',
    user:'root',
    password:'1234',
    database:"Bookshop",
    dateStrings:true
})

module.exports = connection;