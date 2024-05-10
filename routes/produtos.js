const express = require('express');
const router = express.Router();
const mysql = require('../mysql')
const Produtos = require('../models/produtosModel');

  //Exibi os produtos
router.get('/', (req, res) => {
  try {
    mysql.query(`SELECT 
        produtos.IdProduto, 
        produtos.nome, 
        produtos.descricao, 
        produtos.precoProduto, 
        produtos.quantidadeestoque,
        categorias.nomeCategoria AS categoria
    FROM produtos
    JOIN categorias ON produtos.IdCategoria = categorias.IdCategoria`, (err, results) => {
      if (err) {
        throw err;
      }
      const produtos = results.map(item => {
        return new Produtos(
        item.IdProduto, item.nome,item.descricao, item.precoProduto, item.quantidadeestoque, item.categoria)
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
            item.IdProduto, item.nome,item.descricao, item.precoProduto, item.quantidadeestoque, item.IdCategoria)
            })
        res.status(200).json(produtos);
        })
    } catch (error) {
        console.error('Erro ao executar a consulta:', error);
        res.status(500).json({ error: 'Erro interno ao processar a requisição' });
      }
    });

// Insere os produtos
router.post('/', (req, res) => {
  const produto = req.body; 
  const { IdCategoria } = req.body; 
  if (!IdCategoria) {
      return res.status(400).json({ error: 'O IdCategoria é obrigatório' });
  }
  try {
    mysql.query('INSERT INTO produtos (Nome, precoProduto, descricao, QuantidadeEstoque, IdCategoria) VALUES (?,?,?,?,?)', 
      [produto.nome, produto.precoProduto, produto.descricao, produto.quantidadeEstoque, IdCategoria], 
       (err, result) => {
         if (err) {
          res.status(500).json({ error: 'Erro ao inserir produto:', err });
        } else {
          const novoProduto = new Produtos(result.insertId, produto.nome, produto.precoProduto, produto.descricao, produto.quantidadeEstoque, IdCategoria);
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
        updateQuery += 'nome = ?, ';
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
      if(req.body.IdCategoria){
        updateQuery += 'IdCategoria = ?, ';
        updateValues.push(req.body.IdCategoria);
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

//Deletar produto
  router.delete('/:IdProduto', (req, res) =>{
    try {
     mysql.query('DELETE FROM produtos WHERE IdProduto = ?', [req.params.IdProduto], (err, result) =>{
       if(err){
         console.error('Erro ao excluir produto', err);
         res.status(500).json({error: 'Erro ao excluir produto'});
       }else{
        res.status(202).json({mensagem: "Produto excluído com sucesso"})
       }
     })
    } catch (error) {
     console.error('Erro ao processar a rota DELETE /:IdProduto', error);
     res.status(500).json({error: 'Erro interno ao processar a requisição'});
    }
 });

module.exports = router;