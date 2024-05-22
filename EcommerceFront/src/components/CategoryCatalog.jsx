import React, { useState, useEffect } from 'react';
import axios from 'axios'; 
import './ProductCatalog.css';
import CategoryCard from './CategoryCard';

const CategoryCatalog = () => {
  const [category, setCategory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchCategory() {
      try {
        const resCatagory = await axios.get('http://localhost:3000/categoria');
        setProducts(resCatagory);
        setLoading(false); 
      } catch (error) {
        console.error('Erro ao obter as categorias:', error);
        setError(error); 
        setLoading(false); 
      }
    }
    fetchCategory();
  }, []);

  if (loading) {
    return <div>Carregando...</div>;
  }

  if (error) {
    return <div>Erro: {error.message}</div>;
  }

  return (
    <div className="product-catalog">
      {category.map(oneCategory => (
        <CategoryCard key={oneCategory.IdCategoria} oneCategory={oneCategory} />
      ))}
    </div>
  );
  
};

export default CategoryCatalog;
