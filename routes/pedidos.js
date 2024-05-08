const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.status(200).send({
        mensagem: 'Get funcionando na rota de pedidos'
    });
});

router.post('/', (req, res) => {
    res.status(201).send({
        mensagem: 'Post funcionando em rota de pedidos'
    });
});

router.patch('/', (req, res) => {
    res.status(202).send({
        mensagem: 'Patch funcionando em rota de pedidos'
    });
});

router.delete('/', (req, res) =>{
    res.status(202).send({
        mensagem: 'Delete funcionando em rota de pedidos'
    });
});

router.get('/:IdPedido', (req, res) => {
    const IdPedido = req.params.IdPedido;
    res.status(200).send({
        mensagem: `Get id ${IdPedido} funcionando na rota de itens do pedido`
    });
});
module.exports = router;