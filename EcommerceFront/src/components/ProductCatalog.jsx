import React, { useState, useEffect } from 'react';
import axios from 'axios'; 
import ProductCard from './ProductCard';
import './ProductCatalog.css';

const ProductCatalog = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await axios.get('http://localhost:3000/produtos');
        const productsWithImages = await Promise.all(res.data.map(async product => {
          try {
            let imageUrl = null;
            if (product.file) {
              imageUrl = `http://localhost:3000/produtos/imagem/${product.IdProduto}`;
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

  if (loading) {
    return <div>Carregando...</div>;
  }

  if (error) {
    return <div>Erro: {error.message}</div>;
  }

  return (
    <div className="product-catalog">
      {products.map(product => (
        <ProductCard key={product.idProduto} product={product} />
      ))}
    </div>
  );
  
};

export default ProductCatalog;
