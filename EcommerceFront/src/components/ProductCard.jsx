import React from 'react';
import './ProductCard.css';

const ProductCard = ({ product, onEdit }) => {
  return (
    <div className="product-card">
      <div className="product-image-container">
        {product.file && <img src={product.file} alt={product.nome} className="product-image" />}
      </div>
      <div className="product-details">
        <table>
          <thead>
            <tr>
              <th>Id do Produto</th>
              <th>Nome</th>
              <th>Preço</th>
              <th>Descrição</th>
              <th>Quantidade no estoque</th>
              <th>Categoria</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{product.idProduto}</td>
              <td>{product.nome}</td>
              <td>{product.precoProduto}</td>
              <td>{product.descricao}</td>
              <td>{product.quantidadeestoque}</td>
              <td>{product.IdCategoria}</td>
              <td>
                <button className="edit-button" onClick={() => onEdit(product)}>
                  Editar
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductCard;
