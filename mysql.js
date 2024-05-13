const password = process.env.MYSQL_PASSWORD;
const mysql = require('mysql2')


const pool = mysql.createPool({
    "user": "root",
    "password": password,
    "database": "ecommerce",
    "host": "localhost",
    "port": 3306,
    "connectionLimit": 10, 
    "waitForConnections": true, 
    "queueLimit": 0 
});

pool.getConnection((err, connection) => {
    if (err) {
        console.error("Erro ao conectar ao banco de dados:", err);
        return;
    }
    console.log("Conexão bem-sucedida ao banco de dados");
    connection.release(); 
});

module.exports = pool;