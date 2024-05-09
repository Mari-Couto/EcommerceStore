const express = require('express');
const router = express.Router();
const mysql = require('../mysql')

//exibir categorias
router.get('/', (req, res) => {
    try {
        mysql.query('SELECT IdCategoria, nomeCategoria FROM categorias', (err, results) =>{
            if(err){
                throw err;
            }
            if (results.length === 0) {
                return res.status(404).json({ error: 'Nenhuma categoria encontrada' });
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

//busca por id de categoria
router.get('/:IdCategoria', (req, res) => {
    const IdCategoria = req.params.IdCategoria;

    try {
        mysql.query('SELECT IdCategoria, nomeCategoria FROM categorias WHERE IdCategoria = ?', [IdCategoria], (err, results) => {
            if (err) {
                throw err;
            }
            if (results.length === 0) {
                return res.status(404).json({ error: 'Categoria não encontrada' });
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

router.patch('/', (req, res) => {
    res.status(202).send({
        mensagem: 'Patch funcionando em rota de categoria'
    });
});

router.delete('/', (req, res) =>{
    res.status(202).send({
        mensagem: 'Delete funcionando em rota de categoria'
    });
});

router.get('/:IdCategoria', (req, res) => {
    res.status(200).send({
        mensagem: 'Get id funcionando na rota de itens do categoria'
    });
});


module.exports = router;