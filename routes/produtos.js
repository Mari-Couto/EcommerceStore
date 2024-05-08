const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.status(200).send({
        mensagem: 'Get funcionando na rota de produtos'
    });
});

router.post('/', (req, res) => {
  const produto = {
    nome: req.body.nome,
    preco: req.body.preco,
    descricao: req.body.descricao
  };
  res.status(201).send({
    mensagem: "Insere um produto",
    produtoCriado: produto
  })
});

router.patch('/', (req, res) => {
    res.status(202).send({
        mensagem: 'Patch funcionando em rota de produtos'
    });
});

router.delete('/', (req, res) =>{
    res.status(202).send({
        mensagem: 'Delete funcionando em rota de produtos'
    });
});

router.get('/:IdProduto', (req, res) => {
    const IdProduto = req.params.IdProduto;
    res.status(200).send({
        mensagem: `Get id ${IdProduto} funcionando na rota de itens do pedido`
    });
});

module.exports = router;