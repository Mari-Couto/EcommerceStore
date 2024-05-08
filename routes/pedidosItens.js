const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.status(200).send({
        mensagem: 'Get funcionando na rota de itens do pedido'
    });
});

router.post('/', (req, res) => {
    res.status(201).send({
        mensagem: 'Post funcionando em rota de itens do pedido'
    });
});

router.patch('/', (req, res) => {
    res.status(202).send({
        mensagem: 'Patch funcionando em rota de itens do pedido'
    });
});

router.delete('/', (req, res) =>{
    res.status(202).send({
        mensagem: 'Delete funcionando em rota de itens do pedido'
    });
});

router.get('/:IdPedidoItem', (req, res) => {
    const IdPedidoItem = req.params.IdPedidoItem;
    res.status(200).send({
        mensagem: `Get id ${IdPedidoItem} funcionando na rota de itens do pedido`
    });
});

module.exports = router;