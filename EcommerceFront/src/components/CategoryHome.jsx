import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './CategoryHome.css';

const CategoryHome = () => {
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [fetchError, setFetchError] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('http://localhost:3000/categoria');
        setCategories(response.data);
      } catch (error) {
        console.error('Error fetching categories:', error);
        setFetchError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCategories();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (fetchError) {
    return <div>Error: {fetchError}</div>;
  }

  return (
    <div className="containerCategoryHome">
      {categories.map(category => (
        <div className="category-cardHome" key={category.IdCategoria}>
          <div className="category-detailsHome">
            <h2>{category.nomeCategoria}</h2>
          </div>
        </div>
      ))}
    </div>
  );
}

export default CategoryHome;
