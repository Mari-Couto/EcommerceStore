import React, { useState, useEffect } from 'react';
import axios from 'axios';
import postOrder from './PostOrders';
import './ProductsHome.css';

const ProductsHome = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(5); 
  const [orderStatus, setOrderStatus] = useState(null);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await axios.get('http://localhost:3000/produtos');
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
  }, []);

  const handleBuyButtonClick = async (product) => {
    try {
      const response = await postOrder(product);
      setOrderStatus(`Pedido inserido com sucesso! ID do Pedido: ${response.IdPedido}`);
    } catch (error) {
      setOrderStatus('Erro ao inserir pedido. Tente novamente.');
    }
  };
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
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
      {currentProducts.map(product => (
        <div key={product.idProduto} className="card-product">
          <div className="image-container">
            {product.imageUrl && <img src={product.imageUrl} alt={product.nome} className="image" />}
          </div>
          <div className="products">
            <h3>{product.nome}</h3>
            <p>Preço: R$ {product.precoProduto}</p>
            <p>{product.descricao}</p>
            <button className="buy-button" onClick={() => handleBuyButtonClick(product)}>Comprar</button>
            {orderStatus && <div className="order-status">{orderStatus}</div>}
          </div>
        </div>
      ))}
    </div>
      <div className="pagination">
      {Array.from({ length: Math.ceil(products.length / productsPerPage) }).map((_, index) => (
        <button key={index + 1} onClick={() => paginate(index + 1)} className={`page-link ${currentPage === index + 1 ? 'active' : ''}`}>
          {index + 1}
        </button>
      ))}
    </div>
    </div>
  );
};

export default ProductsHome;
