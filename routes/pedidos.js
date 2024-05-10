const express = require('express');
const router = express.Router();
const mysql = require('../mysql')

//exibir pedidos
router.get('/', (req, res) => {
    try {
        mysql.query(
            'SELECT * FROM pedidos',
            (err, results) => {
                if (err) {
                    console.error('Erro ao buscar o pedido:', err);
                    return res.status(500).json({ error: 'Erro ao buscar o pedido' });
                }
                res.status(200).json(results);
            }
        );
    } catch (error) {
        console.error('Erro ao processar a requisição:', error);
        res.status(500).json({ error: 'Erro interno ao processar a requisição' });
    }
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