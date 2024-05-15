import React, { useState, useEffect } from 'react';
import ProductCard from './ProductCard';
import './ProductCatalog.css';

const ProductCatalog = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('http://localhost:3000/produtos')
      .then(response => {
        if (!response.ok) {
          throw new Error('A resposta da rede não foi ok');
        }
        return response.json();
      })
      .then(data => {
        setProducts(data);
        setLoading(false);
      })
      .catch(error => {
        setError(error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Carregando...</div>;
  }

  if (error) {
    return <div>Erro: {error.message}</div>;
  }

  return (
    <div className="product-catalog">
      {products.map(product => (
        <ProductCard key={product.IdProduto} product={product} />
      ))}
    </div>
  );
};

export default ProductCatalog;
