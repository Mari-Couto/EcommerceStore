import React, { useState } from 'react';
import './EditModal.css';

const EditModal = ({ isOpen, onClose, product, onEdit, onDelete }) => {
  const [editedProduct, setEditedProduct] = useState({ ...product });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedProduct({ ...editedProduct, [name]: value });
  };

  const handleEdit = () => {
    onEdit(editedProduct);
    onClose();
  };

  const handleDelete = () => {
    onDelete(product.id);
    onClose();
  };

  if (isOpen) {
    return (
      <div className='background'>
        <div className='modal'>

          <h2>Editar Produto</h2>
          <form onSubmit={handleEdit}>
            <label>Nome:
              <input type="text" name="name" value={editedProduct.name} onChange={handleChange} />
            </label>
            {/* Adicione outros campos de edição aqui */}
            <button type="submit">Salvar</button>
          </form>

          <button onClick={handleDelete}>Excluir Produto</button>


          <div className="close">
            <button onClick={onClose} className="Buttonclose">Fechar</button>
          </div>
        </div>
      </div>
    );
  }

  return null;
};

export default EditModal;
