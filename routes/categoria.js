const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.status(200).send({
        mensagem: 'Get funcionando na rota de categoria'
    });
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

module.exports = router;