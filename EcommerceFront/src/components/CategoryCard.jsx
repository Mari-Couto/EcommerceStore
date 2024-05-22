import React from 'react';
import './Category.css';

const CategoryCard = ({ category }) => {
  return (
    <div className="category-card">
      <div className="category-details">
        <table>
          <thead>
            <tr>
              <th>Id da Categoria</th>
              <th>Nome</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className='categoriesNames'>{category.IdCategoria}</td>
              <td className='categoriesNames'>{category.nomeCategoria}</td>
              <td>
                <div className='button-container'>
                  <button className="edit-button">Editar</button>
                  <button className="delete-button">Excluir</button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default CategoryCard;
