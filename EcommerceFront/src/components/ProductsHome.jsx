import React, { useState, useEffect } from 'react';
import axios from 'axios';
import postOrder from './PostOrders';
import './ProductsHome.css';
import './ModalBuy.css';

const ProductsHome = ({ IdCategoria }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPageHome] = useState(8);
  const [showModal, setShowModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [modalMessage, setModalMessage] = useState('');
  const [modalSuccess, setModalSuccess] = useState(false);

  useEffect(() => {
    async function fetchProducts() {
      try {
        let url = 'http://localhost:3000/produtos';
        if (IdCategoria) {
          url += `?IdCategoria=${IdCategoria}`;
        }
        const res = await axios.get(url);
        const productsWithImages = await Promise.all(res.data.map(async product => {
          let imageUrl = null;
          if (product.file) {
            imageUrl = `http://localhost:3000/produtos/imagem/${product.idProduto}`;
          }
          return {
            ...product,
            imageUrl: imageUrl
          };
        }));
        setProducts(productsWithImages);
        setLoading(false);
      } catch (error) {
        console.error('Erro ao obter os produtos:', error);
        setError(error);
        setLoading(false);
      }
    }
    fetchProducts();
  }, [IdCategoria]);

  useEffect(() => {
    if (showModal) {
      const timer = setTimeout(() => {
        setShowModal(false);
        setSelectedProduct(null);
      }, 1500);

      return () => clearTimeout(timer);
    }
  }, [showModal]);

  const handleBuyButtonClick = async (product) => {
    try {
      const response = await postOrder(product);
      setModalMessage('Pedido inserido com sucesso no carrinho!');
      setModalSuccess(true);
    } catch (error) {
      setModalMessage('Erro ao inserir pedido. Tente novamente.');
      setModalSuccess(false);
    }
    setSelectedProduct(product);
    setShowModal(true);
  };

  const indexOfLastProduct = currentPage * productsPerPageHome;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPageHome;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

  const paginate = pageNumber => setCurrentPage(pageNumber);

  if (loading) {
    return <div>Carregando...</div>;
  }

  if (error) {
    return <div>Erro: {error.message}</div>;
  }

  return (
    <div>
      <div className="catalog">
        {currentProducts.map((product, index) => (
          <div
            key={product.idProduto}
            className={`card-product ${index === currentProducts.length - 1 ? 'last-card' : ''}`}
          >
            <div className="image-container">
              {product.imageUrl && <img src={product.imageUrl} alt={product.nome} className="image" />}
            </div>
            <div className="products">
              <h3>{product.nome}</h3>
              <p>Preço: R$ {product.precoProduto}</p>
              <p>{product.descricao}</p>
              <button className="buy-button" onClick={() => handleBuyButtonClick(product)}>Comprar</button>
            </div>
          </div>
        ))}
      </div>
      <div className="pagination">
        {Array.from({ length: Math.ceil(products.length / productsPerPageHome) }).map((_, index) => (
          <button key={index + 1} onClick={() => paginate(index + 1)} className={`page-link ${currentPage === index + 1 ? 'active' : ''}`}>
            {index + 1}
          </button>
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

export default ProductsHome;
