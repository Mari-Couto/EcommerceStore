const express = require('express');
const router = express.Router();
const mysql = require('../mysql')

//exibir categorias
router.get('/', (req, res) => {
    try {
        mysql.query('SELECT IdCategoria, nomeCategoria FROM categorias', (err, results) => {
            if (err) {
                throw err;
            }
            if (results.length === 0) {
                return res.status(404).json({ error: 'Nenhuma categoria encontrada' });
            }
            
            const categorias = results.map(categoria => ({
                IdCategoria: categoria.IdCategoria,
                nomeCategoria: categoria.nomeCategoria
            }));
            res.status(200).json(categorias);
        });
    } catch (error) {
        console.error('Erro ao executar a consulta:', error);
        res.status(500).json({ error: 'Erro interno ao processar a requisição' });
    }
});


//busca por id de categoria
router.get('/:IdCategoria', (req, res) => {
    const IdCategoria = req.params.IdCategoria;

    try {
        mysql.query('SELECT IdCategoria, nomeCategoria FROM categorias WHERE IdCategoria = ?', [IdCategoria], (err, results) => {
            if (err) {
                throw err;
            }
            if (results.length === 0) {
                return res.status(404).json({ error: `Categoria com o ID #${IdCategoria} não encontrada` });
            }
            const categoria = {
                IdCategoria: results[0].IdCategoria,
                nomeCategoria: results[0].nomeCategoria
            };
            res.status(200).json(categoria);
        });
    } catch (error) {
        console.error('Erro ao executar a consulta:', error);
        res.status(500).json({ error: 'Erro interno ao processar a requisição' });
    }
});

router.get('/:IdCategoria/produtos', (req, res) => {
    const IdCategoria = req.params.IdCategoria;
    try {
      mysql.query(
        `SELECT 
          p.IdProduto, 
          p.nome, 
          p.precoProduto,
          p.descricao,  
          p.quantidadeestoque,
          p.file
        FROM produtos as p
        WHERE p.IdCategoria = ?`,
        [IdCategoria],
        (err, results) => {
          if (err) {
            throw err;
          }
          const produtos = results.map(item => {
            const fileLink = item.file ? `/produtos/imagem/${item.IdProduto}` : null;
            return {
              IdProduto: item.IdProduto,
              nome: item.nome,
              precoProduto: item.precoProduto,
              descricao: item.descricao,
              quantidadeestoque: item.quantidadeestoque,
              fileLink: fileLink
            };
          });
          res.status(200).json(produtos);
        }
      );
    } catch (error) {
      console.error('Erro ao executar a consulta:', error);
      res.status(500).json({ error: 'Erro interno ao processar a requisição' });
    }
});


//Envio da categoria 
router.post('/', (req, res) => {
    const { nomeCategoria } = req.body;
    if (!nomeCategoria) {
        return res.status(400).json({ error: 'O nome da categoria é obrigatório' });
    }
    try {
        mysql.query('INSERT INTO categorias (nomeCategoria) VALUES (?)', [nomeCategoria], (err, result) => {
            if (err) {
                console.error('Erro ao inserir categoria:', err);
                return res.status(500).json({ error: 'Erro ao inserir categoria' });
            }
            res.status(201).json({ message: 'Categoria inserida com sucesso', IdCategoria: result.insertId });
        });
    } catch (error) {
        console.error('Erro ao processar a requisição:', error);
        res.status(500).json({ error: 'Erro interno ao processar a requisição' });
    }
});

//alterando categoria
router.patch('/:IdCategoria', (req, res) => {
    const IdCategoria = req.params.IdCategoria;
    const { nomeCategoria } = req.body;
    if (!nomeCategoria) {
        return res.status(400).json({ error: 'O nome da categoria é obrigatório' });
    }
    try {
        mysql.query('UPDATE categorias SET nomeCategoria = ? WHERE IdCategoria = ?', [nomeCategoria, IdCategoria], (err, result) => {
            if (err) {
                console.error('Erro ao atualizar categoria:', err);
                return res.status(500).json({ error: 'Erro ao atualizar categoria' });
            }
            if (result.affectedRows > 0) {
                return res.status(200).json({ message: 'Categoria atualizada com sucesso' });
            } else {
                return res.status(404).json({ error: `Categoria com o ID #${IdCategoria} não encontrada` });
            }
        });
    } catch (error) {
        console.error('Erro ao processar a requisição:', error);
        res.status(500).json({ error: 'Erro interno ao processar a requisição' });
    }
});

//Excluir categoria
router.delete('/:IdCategoria', (req, res) => {
    const IdCategoria = req.params.IdCategoria;
    try {
        mysql.query('DELETE FROM categorias WHERE IdCategoria = ?', [IdCategoria], (err, result) => {
            if (err) {
                console.error('Erro ao excluir categoria', err);
                res.status(500).json({ error: 'Erro ao excluir categoria' });
            } else {
                if (result.affectedRows > 0) {
                    res.status(200).json({ message: `Categoria com o ID #${IdCategoria} excluída com sucesso` });
                } else {
                    res.status(404).json({ error:  `Categoria com o ID #${IdCategoria} não encontrada para excluir` });
                }
            }
        });
    } catch (error) {
        console.error('Erro ao processar a rota DELETE /categorias/:IdCategoria', error);
        res.status(500).json({ error: 'Erro interno ao processar a requisição' });
    }
});



module.exports = router;