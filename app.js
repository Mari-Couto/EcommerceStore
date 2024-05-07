 const express = require('express');
 const app = express();

 app.use((req, res) =>{
    res.status(200).send({
        mensagem: "Funcionou"
    });
 });

 module.exports = app;
 