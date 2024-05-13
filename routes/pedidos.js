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
            });
    } catch (error) {
        console.error('Erro ao processar a requisição:', error);
        res.status(500).json({ error: 'Erro interno ao processar a requisição' });
    }
});

// Inserir pedido
router.post('/', (req, res) => {
    try {
        mysql.query(
            'INSERT INTO pedidos (DataPedido, ValorTotal) VALUES (NOW(), (SELECT SUM(Quantidade * Preco) FROM pedidosItens))',
            (err, result) => {
                if (err) {
                    console.error('Erro ao inserir pedido:', err);
                    return res.status(500).json({ error: 'Erro ao inserir pedido' });
                }
                res.status(201).json({ message: 'Pedido inserido com sucesso', IdPedido: result.insertId });
            }
        );
    } catch (error) {
        console.error('Erro ao processar a requisição:', error);
        res.status(500).json({ error: 'Erro interno ao processar a requisição' });
    }
});

// Delete do pedido
router.delete('/:IdPedido', (req, res) => {
    const IdPedido = req.params.IdPedido;

    try {
        mysql.query(
            'DELETE FROM pedidos WHERE IdPedido = ?',
            [IdPedido],
            (err, result) => {
                if (err) {
                    console.error('Erro ao excluir o pedido:', err);
                    return res.status(500).json({ error: 'Erro ao excluir o pedido' });
                }
                if (result.affectedRows === 0) {
                    return res.status(404).json({ error: 'Pedido não encontrado' });
                }
                res.status(202).json({ mensagem: 'Pedido excluído com sucesso' });
            }
        );
    } catch (error) {
        console.error('Erro ao processar a requisição:', error);
        res.status(500).json({ error: 'Erro interno ao processar a requisição' });
    }
});


// Busca por id
router.get('/:IdPedido', (req, res) => {
    const IdPedido = req.params.IdPedido;
    try {
        mysql.query(
            'SELECT * FROM pedidos WHERE IdPedido = ?',
            [IdPedido],
            (err, results) => {
                if (err) {
                    console.error('Erro ao buscar o pedido:', err);
                    return res.status(500).json({ error: 'Erro ao buscar o pedido' });
                }
                if (results.length === 0) {
                    return res.status(404).json({ error: 'Pedido não encontrado' });
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