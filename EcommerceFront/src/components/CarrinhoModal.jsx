import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './CarrinhoModal.css';

const CarrinhoModal = ({ onClose }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [order, setOrder] = useState(null);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [totalValue, setTotalValue] = useState(0);

  useEffect(() => {
    fetchOrder();
  }, []);

  useEffect(() => {
    if (order) {
      calculateTotalValue(order.items);
    }
  }, [order]);

  const fetchOrder = () => {
    setLoading(true);
    try {
      const currentOrder = JSON.parse(localStorage.getItem('currentOrder'));

      if (currentOrder) {
        setOrder(currentOrder);
        fetchProductNames(currentOrder.items);
      } else {
        setOrder(null);
      }
    } catch (error) {
      setError(error.message || 'Erro ao buscar pedido');
    } finally {
      setLoading(false);
    }
  };

  const fetchProductNames = async (items) => {
    try {
      const updatedItems = await Promise.all(items.map(async (item) => {
        const response = await axios.get(`http://localhost:3000/produtos/${item.IdProduto}`);
        return { ...item, nome: response.data.nome };
      }));
      setOrder((prevOrder) => ({
        ...prevOrder,
        items: updatedItems
      }));
    } catch (error) {
      console.error('Erro ao buscar nomes dos produtos:', error);
    }
  };

  const calculateTotalValue = (items) => {
    const total = items.reduce((sum, item) => sum + item.Preco * item.Quantidade, 0);
    setTotalValue(total);
  };

  const handleIncrement = (itemId) => {
    addItemToOrder(itemId);
  };

  const handleDecrement = (itemId) => {
    removeItemFromOrder(itemId);
  };

  const addItemToOrder = async (itemId) => {
    try {
      if (!order) {
        const newOrderResponse = await createNewOrder();
        await axios.post(`http://localhost:3000/pedidosItens/${newOrderResponse.data.IdPedido}`, { itemId });
      } else {
        await axios.post(`http://localhost:3000/pedidosItens/${order.IdPedido}`, { itemId });
      }
      fetchOrder();
    } catch (error) {
      console.error('Erro ao adicionar item ao pedido:', error);
    }
  };

  const removeItemFromOrder = async (itemId) => {
    try {
      if (!order) {
        console.error('Nenhum pedido encontrado.');
        return;
      }
      await axios.delete(`http://localhost:3000/pedidosItens/${order.IdPedido}/${itemId}`);
      fetchOrder();
    } catch (error) {
      console.error('Erro ao remover item do pedido:', error);
    }
  };

  const handleDeleteOrder = () => {
    setShowConfirmationModal(true);
  };

  const handleConfirmDelete = async () => {
    try {
      if (order) {
        await axios.delete(`http://localhost:3000/pedidos/${order.IdPedido}`);
      }
      localStorage.removeItem('currentOrder');
      setOrder(null);
      setShowConfirmationModal(false);
    } catch (error) {
      console.error('Erro ao excluir pedido:', error);
    }
  };

  const handleCancelDelete = () => {
    setShowConfirmationModal(false);
  };

  return (
    <div className="modalCarrinho">
      <div className="modal-contentCarrinho">
        {loading && <div>Carregando pedidos...</div>}
        {error && <div>{error}</div>}
        {!loading && !error && (
          <>
            <h2>Carrinho de Compras</h2>
            <h3>Pedido:</h3>
            {order ? (
              <div className="order-container">
                <p className="order-title">
                  Pedido ID: {order.IdPedido}, Data: {order.DataPedido}
                </p>
                <ul>
                  {order.items && order.items.map((item) => (
                    <li key={item.IdPedidoItem}>
                      <span className="item-name">{item.nome}</span>
                      <div className="item-quantidade">
                        <span>Quantidade: {item.Quantidade}</span>
                        <button className="buttonQuantidade" onClick={() => handleIncrement(item.IdPedidoItem)}>+</button>
                        <button className="buttonQuantidade" onClick={() => handleDecrement(item.IdPedidoItem)}>-</button>
                      </div>
                      <span className="item-preco">Preço: R$ {item.Preco}</span>
                    </li>
                  ))}
                  <span className="valorTotal">Valor Total: R$ {totalValue.toFixed(2)}</span>
                  <button className="buttonDelete" onClick={handleDeleteOrder}>Excluir Pedido</button>
                </ul>
              </div>
            ) : (
              <p>Nenhum pedido encontrado. Adicione itens ao seu carrinho.</p>
            )}
          </>
        )}
        <span className="ButtoncloseCarrinho" onClick={onClose}>
          &times;
        </span>
      </div>

      {showConfirmationModal && (
        <div className="background">
          <div className="modalDelete">
            <h2>Tem certeza que deseja excluir este pedido?</h2>
            <div className="confirmDelete">
              <button onClick={handleConfirmDelete} className="yesbutton">Sim</button>
              <button onClick={handleCancelDelete} className="notbutton">Cancelar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CarrinhoModal;
