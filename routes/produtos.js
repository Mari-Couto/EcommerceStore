const express = require('express');
const router = express.Router();
const mysql = require('../mysql')
const Produtos = require('../models/produtosModel')

router.get('/', (req, res) => {
    try {
      mysql.query('SELECT IdProduto, nome, descricao, precoProduto, quantidadeestoque FROM produtos', (err, results) => {
        if (err) {
          throw err;
        }
        const produtos = results.map(item => {
            return new Produtos(
            item.IdProduto, item.nome,item.descricao, item.precoProduto, item.quantidadeestoque)
        });
        res.status(200).json(produtos);
      });
    } catch (error) {
      console.error('Erro ao executar a consulta:', error);
      res.status(500).json({ error: 'Erro interno ao processar a requisição' });
    }
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