import React from 'react';
import './ProductCard.css';

const ProductCard = ({ product }) => {
  return (
    <div className="product-card">
      <table>
        <thead>
          <tr>
            <th className="product-image-container">
              {product.file && <img src={product.file} alt={product.nome} className="product-image" />}
            </th>
            <th>Id do Produto</th>
            <th>Nome</th>
            <th>Preço</th>
            <th>Descrição</th>
            <th>Quantidade no estoque</th>
            <th>Categoria</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{product.IdProduto}</td>
            <td>{product.nome}</td>
            <td>{product.precoProduto}</td>
            <td>{product.Descricao}</td>
            <td>{product.QuantidadeEstoque}</td>
            <td>{product.IdCategoria}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default ProductCard;
