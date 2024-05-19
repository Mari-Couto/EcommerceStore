// CarrinhoModal.jsx
import React from 'react';
import './CarrinhoModal.css'; 

const CarrinhoModal = ({ onClose }) => {
  return (
    <div className="modalCarrinho">
      <div className="modal-contentCarrinho">
        <h2>Carrinho de Compras</h2>
        <p>Itens no seu carrinho...</p>
        <span className="ButtoncloseCarrinho" onClick={onClose}>&times;</span>
      </div>
    </div>
  );
};

export default CarrinhoModal;
