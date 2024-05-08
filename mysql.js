const password = process.env.MYSQL_PASSWORD;
const mysql = require('mysql2')

const connection = mysql.createConnection({
    "user": "root",
    "password": password,
    "database": "ecommerce",
    "host": "localhost",
    "port": 3306
});

connection.connect((err) => {
    if(err) {
        console.error("Erro ao conectar ao banco de dados:", err)
        return;
    }
    console.log("Conexão bem-sucedida ao banco de dados")
})

module.exports = connection;