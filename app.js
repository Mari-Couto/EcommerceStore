 const express = require('express');
 const app = express();

 const rotaProdutos = require('./routes/produtos')
 const rotaPedidos = require('./routes/pedidos')
 const rotaPedidosItens = require('./routes/pedidosItens')
 const rotaCategoria = require('./routes/categoria')

 app.use('/categoria', rotaCategoria)
 app.use('/pedidosItens', rotaPedidosItens)
 app.use('/pedidos', rotaPedidos);
 app.use('/produtos', rotaProdutos);


 module.exports = app;
