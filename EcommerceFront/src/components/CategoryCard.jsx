import React, { useState } from 'react';
import axios from 'axios';
import './Category.css';

const CategoryCard = ({ category }) => {
  const [newName, setNewName] = useState(category.nomeCategoria);
  const [isEditing, setIsEditing] = useState(false);

  const handleInputChange = (e) => {
    setNewName(e.target.value);
  };

  const handleUpdate = async () => {
    try {
      await axios.patch(`http://localhost:3000/categoria/${category.IdCategoria}`, { nomeCategoria: newName });
      setIsEditing(false);
    } catch (error) {
      console.error('Erro ao atualizar a categoria:', error);
    }
  };

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
              <td className='categoriesNames'>
                {isEditing ? (
                  <input
                    type="text"
                    value={newName}
                    onChange={handleInputChange}
                  />
                ) : (
                  category.nomeCategoria
                )}
              </td>
              <td>
                <div className='button-container'>
                  {isEditing ? (
                    <button className="save-button" onClick={handleUpdate}>Salvar</button>
                  ) : (
                    <button className="edit-button" onClick={() => setIsEditing(true)}>Editar</button>
                  )}
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
