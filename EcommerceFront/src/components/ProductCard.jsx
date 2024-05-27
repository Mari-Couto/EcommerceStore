import React from 'react';
import './ProductCard.css';
import EditModal from './EditModal'; 
import DeleteProduct from './DeleteProduct';

const ProductCard = ({ product, onDelete }) => {
  const [openModal, setOpenModal] = React.useState(false);

  return (
    <div className={`product-card`}>
      <div className="product-image-container">
        {product.imageUrl && <img src={product.imageUrl} alt={product.nome} className="product-image" />}
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
                <div className='button-container'>
                  <button className="edit-button" onClick={() => setOpenModal(true)}>Editar</button>
                  <EditModal  productId={product.idProduto} isOpen={openModal} onClose={() => setOpenModal(false)} product={product} />
                  <DeleteProduct productId={product.idProduto} onDelete={onDelete} />
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductCard;
