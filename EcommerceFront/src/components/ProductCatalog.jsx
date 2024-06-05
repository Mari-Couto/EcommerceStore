import React, { useState, useEffect } from 'react';
import axios from 'axios'; 
import ProductCard from './ProductCard';
import './ProductCatalog.css';

const Pagination = ({ totalPages, currentPage, onPageChange }) => {
  return (
    <div className="pagination">
      {Array.from({ length: totalPages }, (_, index) => (
        <button
          key={index}
          onClick={() => onPageChange(index + 1)}
          className={currentPage === index + 1 ? 'active' : ''}
        >
          {index + 1}
        </button>
      ))}
    </div>
  );
};

const ProductCatalog = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 4;

  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await axios.get('http://localhost:3000/produtos');
        const productsWithImages = await Promise.all(res.data.map(async product => {
          try {
            let imageUrl = null;
            if (product.file) {
              imageUrl = `http://localhost:3000/produtos/imagem/${product.idProduto}`;
            }
            return {
              ...product,
              imageUrl: imageUrl
            };
          } catch (error) {
            console.error('Erro ao obter imagem do produto:', error);
            return product;
          }
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

  const handleDelete = (productId) => {
    setProducts(prevProducts => prevProducts.filter(product => product.idProduto !== productId));
  };

  if (loading) {
    return <div>Carregando...</div>;
  }

  if (error) {
    return <div>Erro: {error.message}</div>;
  }

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(products.length / productsPerPage);

  return (
    <div className="product-catalog">
    {currentProducts.map((product, index) => (
      <div key={product.idProduto}>
        <ProductCard 
          product={product} 
          onDelete={handleDelete} 
          isLast={index === currentProducts.length - 1} 
        />
      </div>
    ))}
    <Pagination
      totalPages={totalPages}
      currentPage={currentPage}
      onPageChange={setCurrentPage}
    />
  </div>
  );
};

export default ProductCatalog;
