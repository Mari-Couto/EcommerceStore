import { useState } from 'react';
import './ProductCard.css';
import './ProductCatalog';
import EditModal from './EditModal'; 

const ProductCard = ({ product }) => {

  const [openModal, setOpenModal] = useState(false)

  return (
    <div className="product-card">
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
               <EditModal isOpen={openModal} onClose={() => setOpenModal(false)} />
               <button className="delete-button">Excluir</button>
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
