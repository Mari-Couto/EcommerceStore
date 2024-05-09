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


router.post('/', (req, res) => {
    res.status(201).send({
        mensagem: 'Post funcionando em rota de categoria'
    });
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


router.get('/:IdCategoria', (req, res) => {
    const IdCategoria = req.params.IdCategoria;
    res.status(200).send({
        mensagem: `Get id ${IdCategoria} funcionando na rota de itens do pedido`
    });
});

module.exports = router;