const express = require('express');
const router = express.Router();
const mysql = require('../mysql')
const PedidosItens = require('../models/pedidosItensModel')


// Exibir itens do pedido
router.get('/', (req, res) => {
    const query = `
        SELECT 
            produtos.Nome,
            p.IdPedidoItem,
            pedidos.IdPedido,
            produtos.IdProduto,
            p.Quantidade,
            p.Preco,
            produtos.file AS file
        FROM pedidosItens AS p
        JOIN pedidos ON p.IdPedido = pedidos.IdPedido
        JOIN produtos ON p.IdProduto = produtos.IdProduto;
    `;
    mysql.query(query, (err, results) => {
        if (err) {
            console.error('Erro ao buscar itens do pedido:', err);
            return res.status(500).json({ error: 'Erro ao buscar itens do pedido' });
        }
        try {
            const pedidosItens = results.map(item => {
                const fileLink = item.file ? `/produtos/imagem/${item.IdProduto}` : null;
                return new PedidosItens(
                    item.IdPedidoItem,
                    item.IdPedido,
                    item.IdProduto,
                    item.Quantidade,
                    item.Preco,
                    fileLink
                );
            });

            res.status(200).json(pedidosItens);
        } catch (error) {
            console.error('Erro ao processar os resultados:', error);
            res.status(500).json({ error: 'Erro interno ao processar a requisição' });
        }
    });
});


//Inserir item do pedido
router.post('/', (req, res) => {
    const { IdPedido, IdProduto, Quantidade, Preco } = req.body;

    if (!IdPedido || !IdProduto || !Quantidade || !Preco) {
        return res.status(400).json({ error: 'Todos os campos são obrigatórios.' });
    }

    try {
        mysql.query(
            'INSERT INTO pedidosItens (IdPedido, IdProduto, Quantidade, Preco) VALUES (?, ?, ?, ?)',
            [IdPedido, IdProduto, Quantidade, Preco],
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

  
//alterar item de pedido
router.patch('/:IdPedidoItem', (req, res) => {
    const IdPedidoItem = req.params.IdPedidoItem;
    const { Quantidade, Preco } = req.body;

    try {
        mysql.query(
            'UPDATE pedidosItens SET Quantidade = ?, Preco = ? WHERE IdPedidoItem = ?',
            [Quantidade, Preco, IdPedidoItem],
            (err, result) => {
                if (err) {
                    console.error('Erro ao atualizar item de pedido:', err);
                    return res.status(500).json({ error: 'Erro ao atualizar item de pedido' });
                }
                if (result.affectedRows === 0) {
                    return res.status(404).json({ error: 'Item de pedido não encontrado' });
                }
                res.status(200).json({ message: 'Item de pedido atualizado com sucesso' });
            }
        );
    } catch (error) {
        console.error('Erro ao processar a requisição:', error);
        res.status(500).json({ error: 'Erro interno ao processar a requisição' });
    }
});


//deletar item de pedido
router.delete('/:IdPedidoItem', (req, res) => {
    const IdPedidoItem = req.params.IdPedidoItem;

    try {
        mysql.query(
            'DELETE FROM pedidosItens WHERE IdPedidoItem = ?',
            [IdPedidoItem],
            (err, result) => {
                if (err) {
                    console.error('Erro ao excluir item de pedido:', err);
                    return res.status(500).json({ error: 'Erro ao excluir item de pedido' });
                }
                if (result.affectedRows > 0) {
                    res.status(200).json({ message: 'Item de pedido excluído com sucesso' });
                } else {
                    res.status(404).json({ error: 'Item de pedido não encontrado' });
                }
            }
        );
    } catch (error) {
        console.error('Erro ao processar a requisição:', error);
        res.status(500).json({ error: 'Erro interno ao processar a requisição' });
    }
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