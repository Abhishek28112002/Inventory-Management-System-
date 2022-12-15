const {Client} = require('pg')

const client = new Client({
    host: "localhost",
    user: "postgres",
    port: 5433,
    password: "abhi28112002@",
    database: "postgres",
    url:"postgres://postgres:pgabhi28112002@@db:5432/mydatabase"
})

module.exports = client