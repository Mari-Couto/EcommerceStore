const express = require('express');
const router = express.Router();
const mysql = require('../mysql')

//exibir itens do pedido
router.get('/', (req, res) => {
    try {
        mysql.query(
            'SELECT * FROM pedidosItens',
            (err, results) => {
                if (err) {
                    console.error('Erro ao buscar itens do pedido:', err);
                    return res.status(500).json({ error: 'Erro ao buscar itens do pedido' });
                }
                res.status(200).json(results);
            }
        );
    } catch (error) {
        console.error('Erro ao processar a requisição:', error);
        res.status(500).json({ error: 'Erro interno ao processar a requisição' });
    }
});


//Inserir item do pedido
router.post('/', (req, res) => {
    const { IdPedido, IdProduto, Quantidade, Preco_unitario } = req.body;
    if (!IdProduto || !Quantidade || !Preco_unitario) {
        return res.status(400).json({ error: 'Todos os campos são obrigatórios:' });
    }
    try {
        mysql.query(
            'INSERT INTO pedidosItens (IdPedido, IdProduto, Quantidade, Preco_unitario) VALUES (?, ?, ?, ?)',
            [IdPedido, IdProduto, Quantidade, Preco_unitario],
            (err, result) => {
                if (err) {
                    console.error('Erro ao inserir item de pedido:', err);
                    return res.status(500).json({ error: 'Erro ao inserir item de pedido' });
                }
                res.status(201).json({ message: 'Item de pedido inserido com sucesso', IdPedidoItem: result.insertId });
            }
        );
    } catch (error) {
        console.error('Erro ao processar a requisição:', error);
        res.status(500).json({ error: 'Erro interno ao processar a requisição' });
    }
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

//busca por id
router.get('/:IdPedidoItem', (req, res) => {
    const IdPedidoItem = req.params.IdPedidoItem;
    try {
        mysql.query(
            'SELECT * FROM pedidosItens WHERE IdPedidoItem = ?',
            [IdPedidoItem],
            (err, results) => {
                if (err) {
                    console.error('Erro ao buscar item do pedido:', err);
                    return res.status(500).json({ error: 'Erro ao buscar item do pedido' });
                }
                if (results.length === 0) {
                    return res.status(404).json({ error: 'Item do pedido não encontrado' });
                }
                res.status(200).json(results[0]);
            }
        );
    } catch (error) {
        console.error('Erro ao processar a requisição:', error);
        res.status(500).json({ error: 'Erro interno ao processar a requisição' });
    }
});


module.exports = router;