const express = require('express');
const router = express.Router();
const mysql = require('../mysql');
const Produtos = require('../models/produtosModel');
const multer = require('multer');
const path = require('path'); 
const fs = require('fs'); 
const sharp = require('sharp'); 
const storage = require('../MulterConfig');
const upload = multer({ storage: storage });

// Exibe os produtos
router.get('/', (req, res) => {
  try {
    mysql.query(`SELECT 
        p.IdProduto, 
        p.nome, 
        p.precoProduto,
        p.descricao,  
        p.quantidadeestoque,
        p.file,
        categorias.nomeCategoria AS categoria
    FROM produtos as p
    JOIN categorias ON p.IdCategoria = categorias.IdCategoria`, (err, results) => {
      if (err) {
        throw err;
      }
      const produtos = results.map(item => {
        const fileLink = item.file ? `/produtos/imagem/${item.IdProduto}` : null;
        return new Produtos(
          item.IdProduto, item.nome, item.precoProduto, item.descricao, item.quantidadeestoque, item.categoria, fileLink);
      });
      res.status(200).json(produtos);
    });
  } catch (error) {
    console.error('Erro ao executar a consulta:', error);
    res.status(500).json({ error: 'Erro interno ao processar a requisição' });
  }
});

// Retorna dados de um produto
router.get('/:IdProduto', (req, res) => {
  const IdProduto = req.params.IdProduto;
  try {
    mysql.query('SELECT * FROM produtos WHERE IdProduto = ?', [IdProduto], (err, results) => {
      if (err) {
        throw err;
      }
      if (results.length == 0) {
        return res.status(404).send({
          mensagem: `Não foi encontrado nenhum produto com o ID #${IdProduto}`
        });
      }
      const produtos = results.map(item => {
        return new Produtos(
          item.IdProduto, item.nome, item.descricao, item.precoProduto, item.quantidadeestoque, item.IdCategoria);
      });
      res.status(200).json(produtos);
    });
  } catch (error) {
    console.error('Erro ao executar a consulta:', error);
    res.status(500).json({ error: 'Erro interno ao processar a requisição' });
  }
});

// Rota para exibir a imagem com o ID correspondente
router.get('/imagem/:id', (req, res) => {
  const id = req.params.id;
  try {
    mysql.query('SELECT file FROM produtos WHERE IdProduto = ?', [id], (err, results) => {
      if (err) {
        console.error('Erro ao executar a consulta:', err);
        return res.status(500).json({ error: 'Erro interno ao processar a requisição' });
      }
      if (results.length === 0 || !results[0].file) {
        return res.status(404).json({ error: 'Imagem não encontrada' });
      }
      const imageBuffer = results[0].file;
      sharp(imageBuffer)
        .toFormat('jpeg')
        .toBuffer()
        .then(convertedImageBuffer => {
          res.writeHead(200, { 'Content-Type': 'image/jpeg' });
          res.end(convertedImageBuffer);
        })
        .catch(err => {
          console.error('Erro ao converter imagem:', err);
          res.status(500).json({ error: 'Erro interno ao processar a requisição' });
        });
    });
  } catch (error) {
    console.error('Erro ao processar a requisição:', error);
    res.status(500).json({ error: 'Erro interno ao processar a requisição' });
  }
});

// Insere os produtos
router.post('/', upload.single('file'), (req, res) => {
  const produto = req.body; 
  const { nome, descricao, precoProduto, quantidadeEstoque, IdCategoria } = req.body; 
  if (!nome || !descricao || !precoProduto || !quantidadeEstoque || !IdCategoria) {
    return res.status(400).json({ error: 'Todos os itens são obrigatórios' });
  }
  try {
    const fileContent = fs.readFileSync(req.file.path);

    mysql.query('INSERT INTO produtos (Nome, precoProduto, descricao, QuantidadeEstoque, IdCategoria, file) VALUES (?,?,?,?,?,?)', 
      [produto.nome, produto.precoProduto, produto.descricao, produto.quantidadeEstoque, IdCategoria, fileContent], 
      (err, result) => {
        if (err) {
          res.status(500).json({ error: 'Erro ao inserir produto:', err });
        } else {
          res.status(200).json({ message: 'Produto inserido com sucesso' });
        }
      });
  } catch (error) {
    console.error('Erro ao executar a consulta:', error);
    res.status(500).json({ error: 'Erro interno ao processar a requisição' });
  }
});

// Alterar produto

router.patch('/:IdProduto', upload.single('file'), (req, res) => {
  try {
    let updateQuery = 'UPDATE produtos SET ';
    const updateValues = [];
    if (req.body.nome) {
      updateQuery += 'nome = ?, ';
      updateValues.push(req.body.nome);
    } 
    if (req.body.descricao) {
      updateQuery += 'descricao = ?, ';
      updateValues.push(req.body.descricao);
    }
    if (req.body.precoProduto) {
      updateQuery += 'precoProduto = ?, ';
      updateValues.push(req.body.precoProduto);
    }
    if (req.body.quantidadeEstoque) {
      updateQuery += 'quantidadeEstoque = ?, ';
      updateValues.push(req.body.quantidadeEstoque);
    }
    if (req.body.IdCategoria) {
      updateQuery += 'IdCategoria = ?, ';
      updateValues.push(req.body.IdCategoria);
    }
    if (req.file) {
      updateQuery += 'file = ?, ';
      const fileContent = fs.readFileSync(req.file.path);
      updateValues.push(fileContent);
    }
    updateQuery = updateQuery.slice(0, -2); 
    updateQuery += ' WHERE IdProduto = ?';
    updateValues.push(req.params.IdProduto);
    
    mysql.query(updateQuery, updateValues, (err, result) => {
      if (err) {
        res.status(500).json({ error: err });
      } else {
        if (result.affectedRows > 0) {
          res.status(200).json({ message: 'Produto atualizado com sucesso' });
        } else {
          res.status(404).json({ error: `Produto com o ID #${req.params.IdProduto} não encontrado` });
        }
      }
    });
  } catch (error) {
    console.error('Erro ao processar a rota PATCH /:IdProduto', error);
    res.status(500).json({ error: 'Erro interno ao processar a requisição' });
  }
});

// Deletar produto
router.delete('/:IdProduto', (req, res) => {
  try {
    mysql.query('DELETE FROM produtos WHERE IdProduto = ?', [req.params.IdProduto], (err, result) => {
      if (err) {
        console.error('Erro ao excluir produto:', err);
        res.status(500).json({ error: 'Erro ao excluir produto' });
      } else {
        if (result.affectedRows > 0) {
          res.status(202).json({ mensagem: `Produto com o ID #${req.params.IdProduto} excluído com sucesso` });
        } else {
          res.status(404).json({ error: `Produto com o ID #${req.params.IdProduto} não encontrado para excluir` });
        }
      }
    });
  } catch (error) {
    console.error('Erro ao processar a rota DELETE /:IdProduto:', error);
    res.status(500).json({ error: 'Erro interno ao processar a requisição' });
  }
});

module.exports = router;
