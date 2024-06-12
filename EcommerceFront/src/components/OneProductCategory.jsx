import React, { useState, useEffect } from 'react';
import './ProductsHome.css';
import postOrder from './PostOrdersOne';
import './ModalBuy.css';

const OneProductsCategory = ({ products }) => {
  const [productsWithImages, setProductsWithImages] = useState([]);
  const [orderStatuses, setOrderStatuses] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [modalSuccess, setModalSuccess] = useState(false);

  useEffect(() => {
    async function fetchProductsWithImages() {
      try {
        const updatedProducts = products.map(product => {
          let imageUrl = product.fileLink ? `http://localhost:3000${product.fileLink}` : null;
          return {
            ...product,
            imageUrl: imageUrl
          };
        });
        setProductsWithImages(updatedProducts);
      } catch (error) {
        console.error('Erro ao buscar imagens dos produtos:', error);
      }
    }

    fetchProductsWithImages();
  }, [products]);

  const handleBuyButtonClick = async (product) => {
    try {
      await postOrder({ IdProduto: product.IdProduto, ...product });
      setModalMessage(`Produto adicionado ao carrinho com sucesso!`);
      setModalSuccess(true);
      setShowModal(true);
      setTimeout(() => setShowModal(false), 1500); 
    } catch (error) {
      console.error('Erro ao adicionar produto ao carrinho:', error);
      setModalMessage('Erro ao adicionar produto ao carrinho. Tente novamente.');
      setModalSuccess(false);
      setShowModal(true);
      setTimeout(() => setShowModal(false), 1500); 
    }
  };

  return (
    <div>
      <div className="catalog">
        {productsWithImages.map(product => (
          <div key={product.IdProduto} className="card-product">
            <div className="image-container">
              {product.imageUrl ? (
                <img 
                  src={product.imageUrl} 
                  alt={product.nome} 
                  className="image" 
                  onError={(e) => {
                    console.error('Erro ao carregar a imagem:', e.target.src);
                    e.target.onerror = null; 
                    e.target.src = 'fallback-image-url'; 
                  }} 
                />
              ) : (
                <p>Imagem não disponível</p>
              )}
            </div>
            <div className="products">
              <h3>{product.nome}</h3>
              <p>Preço: R$ {product.precoProduto}</p>
              <p>{product.descricao}</p>
              <button className="buy-button" onClick={() => handleBuyButtonClick(product)}>Comprar</button>
              {orderStatuses[product.IdProduto] && (
                <div className={`order-status ${orderStatuses[product.IdProduto].isSuccess ? 'success' : 'error'}`}>
                  {orderStatuses[product.IdProduto].message}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {showModal && (
        <div className="modalBuy">
          <div className="modal-contentBuy">
            <div className={`order-status ${modalSuccess ? 'success' : 'error'}`}>
              {modalMessage}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OneProductsCategory;
