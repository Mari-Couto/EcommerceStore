import React, { useState, useEffect } from 'react';
import axios from 'axios';
import OneProductHome from './OneProductHome';
import './CategoryHome.css';

const CategoryHome = () => {
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [fetchError, setFetchError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [categoryProducts, setCategoryProducts] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('http://localhost:3000/categoria');
        setCategories(response.data);
      } catch (error) {
        console.error('Erro ao buscar categorias:', error);
        setFetchError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const handleCategoryClick = async (categoryId) => {
    try {
      const response = await axios.get(`http://localhost:3000/categoria/${categoryId}/produtos`);
      setCategoryProducts(response.data);
      setSelectedCategory(categoryId);
    } catch (error) {
      console.error('Erro ao buscar produtos da categoria:', error);
    }
  };

  if (isLoading) {
    return <div>Carregando categorias...</div>;
  }

  if (fetchError) {
    return <div>Erro ao buscar categorias: {fetchError}</div>;
  }

  const selectedCategoryData = categories.find(category => category.IdCategoria === selectedCategory);

  return (
    <div className="containerCategoryHome">
      {categories.map(category => (
        <div 
          className={`category-cardHome ${selectedCategory === category.IdCategoria ? 'active' : ''}`} 
          key={category.IdCategoria} 
          onClick={() => handleCategoryClick(category.IdCategoria)}
        >
          <div className="category-detailsHome">
            <h2>{category.nomeCategoria}</h2>
          </div>
        </div>
      ))}

      {selectedCategoryData && (
        <div className="products-container">
          <h3>Produtos da Categoria {selectedCategoryData.nomeCategoria}</h3>
          <OneProductHome products={categoryProducts} />
        </div>
      )}
    </div>
  );
}

export default CategoryHome;