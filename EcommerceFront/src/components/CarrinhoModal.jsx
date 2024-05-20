import React, { useState } from 'react';
import axios from 'axios';
import './CarrinhoModal.css';

const CarrinhoModal = ({ onClose }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [pedido, setPedido] = useState(null);
  const [idPedido, setIdPedido] = useState('');

  const handleIdPedidoChange = (event) => {
    setIdPedido(event.target.value);
  };

  const handleFetchPedido = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`http://localhost:3000/pedidos/${idPedido}`);
      setPedido(response.data);
      setLoading(false);
    } catch (error) {
      setError('Erro ao buscar pedido');
      setLoading(false);
    }
  };

  return (
    <div className="modalCarrinho">
      <div className="modal-contentCarrinho">
        <h2>Carrinho de Compras</h2>
        <div className="input-container">
          <input
            type="text"
            placeholder="Digite o ID do pedido"
            value={idPedido}
            onChange={handleIdPedidoChange}
          />
          <button onClick={handleFetchPedido}>Buscar Pedido</button>
        </div>
        {loading && <div>Carregando...</div>}
        {error && <div>{error}</div>}
        {pedido && (
          <div>
            <h4>Detalhes do Pedido:</h4>
            <p>ID do Pedido: {pedido.IdPedido}</p>
            <p>Data do Pedido: {pedido.DataPedido}</p>
            <p>Valor Total: R$ {pedido.ValorTotal}</p>
          </div>
        )}
        <span className="ButtoncloseCarrinho" onClick={onClose}>&times;</span>
      </div>
    </div>
  );
};

export default CarrinhoModal;
