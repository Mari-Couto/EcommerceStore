import React, { useState } from 'react';
import axios from 'axios';
import './Category.css';

const CategoryCard = ({ category, onDelete, isSearchResult }) => {
  const [newName, setNewName] = useState(category.nomeCategoria);
  const [isEditing, setIsEditing] = useState(false);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);

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

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:3000/categoria/${category.IdCategoria}`);
      onDelete(category.IdCategoria);
    } catch (error) {
      console.error('Erro ao excluir a categoria:', error);
    }
    setShowConfirmationModal(false);
  };

  const handleConfirmDelete = () => {
    setShowConfirmationModal(true);
  };

  const handleCancelDelete = () => {
    setShowConfirmationModal(false);
  };

  return (
    <div className={`containerCategory ${isSearchResult ? 'search-result' : ''}`}>
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
                    <button className="delete-button" onClick={handleConfirmDelete}>Excluir</button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        {showConfirmationModal && (
          <div className="background">
            <div className='modalDelete'>
              <h2>Tem certeza que deseja excluir esta categoria?</h2>
              <div className='confirmDelete'>
                <button onClick={handleDelete} className='yesbutton'>Sim</button>
                <button onClick={handleCancelDelete} className='notbutton'>Cancelar</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default CategoryCard;
