const express = require('express');
const router = express.Router();
const mysql = require('../mysql')

function formatarDataHora(data) {
    const dataObj = new Date(data);
    const dia = dataObj.getDate().toString().padStart(2, '0');
    const mes = (dataObj.getMonth() + 1).toString().padStart(2, '0');
    const ano = dataObj.getFullYear();
    const horas = dataObj.getHours().toString().padStart(2, '0');
    const minutos = dataObj.getMinutes().toString().padStart(2, '0');
    const segundos = dataObj.getSeconds().toString().padStart(2, '0');
    return `${dia}/${mes}/${ano} - ${horas}:${minutos}:${segundos}`;
}

// Exibir pedidos
router.get('/', (req, res) => {
    try {
        mysql.query(
            `SELECT 
                pedidos.IdPedido,
                pedidos.DataPedido,
                SUM(pedidosItens.Quantidade * pedidosItens.Preco) AS ValorTotal
            FROM pedidos
            LEFT JOIN pedidosItens ON pedidos.IdPedido = pedidosItens.IdPedido
            GROUP BY pedidos.IdPedido`,
            (err, results) => {
                if (err) {
                    console.error('Erro ao buscar pedidos:', err);
                    return res.status(500).json({ error: 'Erro ao buscar pedidos' });
                }

                const pedidosFormatados = results.map(pedido => ({
                    IdPedido: pedido.IdPedido,
                    DataPedido: formatarDataHora(pedido.DataPedido),
                    ValorTotal: pedido.ValorTotal
                }));

                res.status(200).json(pedidosFormatados);
            }
        );
    } catch (error) {
        console.error('Erro ao processar a requisição:', error);
        res.status(500).json({ error: 'Erro interno ao processar a requisição' });
    }
});


// Inserir pedido
router.post('/', (req, res) => {
    try {
        mysql.query(
            'INSERT INTO pedidos (DataPedido, ValorTotal) VALUES (NOW(), 0)',
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
router.delete('/:IdPedido', async (req, res) => {
    const IdPedido = req.params.IdPedido;

    try {
        // Excluir os itens associados ao pedido
        await new Promise((resolve, reject) => {
            mysql.query('DELETE FROM pedidosItens WHERE IdPedido = ?', [IdPedido], (err, result) => {
                if (err) {
                    console.error('Erro ao excluir itens do pedido:', err);
                    return reject({ error: 'Erro ao excluir itens do pedido' });
                }
                resolve();
            });
        });

        // Excluir o pedido
        mysql.query('DELETE FROM pedidos WHERE IdPedido = ?', [IdPedido], (err, result) => {
            if (err) {
                console.error('Erro ao excluir pedido:', err);
                return res.status(500).json({ error: 'Erro ao excluir pedido' });
            }
            if (result.affectedRows > 0) {
                return res.status(202).json({ message: `Pedido com o ID #${IdPedido} excluído com sucesso` });
            } else {
                return res.status(404).json({ error: `Pedido com o ID #${IdPedido} não encontrado` });
            }
        });
    } catch (error) {
        console.error('Erro ao processar a requisição:', error);
        return res.status(500).json({ error: 'Erro interno ao processar a requisição' });
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
                    return res.status(404).json({ error: `Pedido com o ID #${IdPedido} não encontrado` });
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