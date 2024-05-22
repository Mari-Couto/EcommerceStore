import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CategoryCard from './CategoryCard';

const CategoryCatalog = () => {
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
        setFetchError(error);
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
    return <div>Error: {fetchError.message}</div>;
  }

  return (
    <div className="product-catalog">
      {categories.map((category) => ( 
        <CategoryCard key={category.IdCategoria} category={category} />
      ))}
    </div>
  );
};

export default CategoryCatalog;