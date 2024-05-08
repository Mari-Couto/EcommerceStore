 const express = require('express');
 const app = express();
 const morgan = require('morgan');

 const rotaProdutos = require('./routes/produtos')
 const rotaPedidos = require('./routes/pedidos')
 const rotaPedidosItens = require('./routes/pedidosItens')
 const rotaCategoria = require('./routes/categoria')

app.use(express.urlencoded({extended: false}));

 app.use(express.json());
 app.use(morgan('dev'));
 app.use('/categoria', rotaCategoria);
 app.use('/pedidosItens', rotaPedidosItens);
 app.use('/pedidos', rotaPedidos);
 app.use('/produtos', rotaProdutos);

 
app.use((req, res, next) => {
    const error = new Error('Rota não encontrada');
    error.status = 404;
    next(error);
});

app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.json({ error: err.message });
});


 module.exports = app;
