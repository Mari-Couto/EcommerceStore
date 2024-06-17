import React, { useState } from 'react';
import CategoryCard from './CategoryCard';
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

const CategoryCatalog = ({ categories = [], onDelete }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const categoriesPerPage = 8;

  const indexOfLastCategory = currentPage * categoriesPerPage;
  const indexOfFirstCategory = indexOfLastCategory - categoriesPerPage;
  const currentCategories = categories.slice(indexOfFirstCategory, indexOfLastCategory);
  const totalPages = Math.ceil(categories.length / categoriesPerPage);

  return (
    <div>
      <div className="category-list">
        {currentCategories.map(category => (
          <CategoryCard 
            key={category.IdCategoria} 
            category={category} 
            onDelete={onDelete} 
          />
        ))}
      </div>
      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
      />
    </div>
  );
};

export default CategoryCatalog;
