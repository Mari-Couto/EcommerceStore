const express = require('express');
const router = express.Router();
const mysql = require('../mysql')
const Produtos = require('../models/produtosModel');

//Exibi os produtos
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

  //Retorna dados de um produto
  router.get('/:IdProduto', (req, res) => {
    const IdProduto = req.params.IdProduto;
    try{
        mysql.query('SELECT * FROM produtos WHERE IdProduto = ?', [IdProduto], (err, results) => {
        if(err){
            throw err;
        }    
        if(results.length == 0){
            return res.status(404).send({
                mensagem: 'Não foi encontrado nenhum produto com esse ID'
            })
        }
        const produtos = results.map(item => {
            return new Produtos(
            item.IdProduto, item.nome,item.descricao, item.precoProduto, item.quantidadeestoque)
            })
        res.status(200).json(produtos);
        })
    } catch (error) {
        console.error('Erro ao executar a consulta:', error);
        res.status(500).json({ error: 'Erro interno ao processar a requisição' });
      }
    });

//Insere os produtos
router.post('/', (req, res) => {
    const produto = req.body; 
    try {
      mysql.query('INSERT INTO produtos (Nome, precoProduto, descricao, QuantidadeEstoque) VALUES (?,?,?,?)', 
        [produto.nome, produto.precoProduto, produto.descricao, produto.quantidadeEstoque], 
         (err, result) => {
           if (err) {
            res.status(500).json({ error: 'Erro ao inserir produto:', err });
          } else {
            const novoProduto = new Produtos(result.insertId, produto.nome, produto.precoProduto, produto.descricao, produto.quantidadeEstoque);
            res.status(200).json({ message: 'Produto inserido com sucesso', produto: novoProduto });
          }
        });
    } catch (error) {
      console.error('Erro ao executar a consulta:', error);
      res.status(500).json({ error: 'Erro interno ao processar a requisição' });
    }
  });

  //Alterar produto
  router.patch('/:IdProduto', (req, res) => {
    try {
      let updateQuery = 'UPDATE produtos SET ';
      const updateValues = [];
      if(req.body.nome){
        updateQuery += 'Nome = ?, ';
        updateValues.push(req.body.nome);
      } 
      if(req.body.descricao){
        updateQuery += 'descricao = ?, ';
        updateValues.push(req.body.descricao);
      }
      if(req.body.precoProduto){
        updateQuery += 'precoProduto = ?, ';
        updateValues.push(req.body.precoProduto);
      }
      if(req.body.quantidadeEstoque){
        updateQuery += 'quantidadeEstoque = ?, ';
        updateValues.push(req.body.quantidadeEstoque);
      }
  
      updateQuery = updateQuery.slice(0, -2); 
      updateQuery += ' WHERE IdProduto = ?';
      updateValues.push(req.params.IdProduto);
      
      mysql.query(updateQuery, updateValues, (err, result) => {
        if (err) {
          res.status(500).json({ error: err});
        } else {
          if (result.affectedRows > 0) {
            res.status(200).json({ message: 'Produto atualizado com sucesso' });
          } else {
            res.status(404).json({ error: 'Produto não encontrado' });
          }
        }
      });
    } catch (error) {
      console.error('Erro ao processar a rota PATCH /:IdProduto', error);
      res.status(500).json({ error: 'Erro interno ao processar a requisição' });
    }
  });
  

router.delete('/', (req, res) =>{
    res.status(202).send({
        mensagem: 'Delete funcionando em rota de produtos'
    });
});


module.exports = router;