import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './CarrinhoModal.css';

const CarrinhoModal = ({ onClose }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrderDetails = async () => {
      setLoading(true);
      try {
        const [orderResponse, itemsResponse] = await Promise.all([
          axios.get('http://localhost:3000/pedidos'),
          axios.get('http://localhost:3000/pedidosItens')
        ]);

        const ordersData = orderResponse.data;
        const itemsData = itemsResponse.data;

        if (!Array.isArray(ordersData) || !Array.isArray(itemsData)) {
          throw new Error('Dados inválidos recebidos da API');
        }

        const combinedOrders = ordersData.map(order => ({
          ...order,
          items: itemsData.filter(item => item.IdPedido === order.IdPedido)
        }));

        setOrders(combinedOrders);
        setLoading(false);
      } catch (error) {
        setError(error.message || 'Erro ao buscar detalhes do pedido');
        setLoading(false);
      }
    };

    fetchOrderDetails();
  }, []);

  const handleIncrement = async (itemId) => {
    try {
      const updatedOrders = orders.map(order => ({
        ...order,
        items: order.items.map(item => {
          if (item.IdPedidoItem === itemId) {
            const newQuantity = item.Quantidade + 1;

            // Atualizar quantidade no backend
            axios.patch(`http://localhost:3000/pedidosItens/${itemId}`, { Quantidade: newQuantity });

            return { ...item, Quantidade: newQuantity };
          }
          return item;
        })
      }));

      setOrders(updatedOrders);
    } catch (error) {
      console.error('Erro ao atualizar a quantidade do item de pedido:', error);
    }
  };

  const handleDecrement = async (itemId) => {
    try {
      const updatedOrders = orders.map(order => ({
        ...order,
        items: order.items.map(item => {
          if (item.IdPedidoItem === itemId) {
            const newQuantity = item.Quantidade - 1;

            // Verifica se a nova quantidade é pelo menos 1
            if (newQuantity >= 1) {
              // Atualizar quantidade no backend
              axios.patch(`http://localhost:3000/pedidosItens/${itemId}`, { Quantidade: newQuantity });
              
              return { ...item, Quantidade: newQuantity };
            }
          }
          return item;
        })
      }));

      setOrders(updatedOrders);
    } catch (error) {
      console.error('Erro ao atualizar a quantidade do item de pedido:', error);
    }
  };

  const handleDeleteOrder = async (orderId) => {
    try {
      const response = await axios.delete(`http://localhost:3000/pedidos/${orderId}`);

      if (response.status === 202) {
        setOrders(orders.filter(order => order.IdPedido !== orderId));
      } else {
        console.error('Erro ao excluir pedido:', response.data.error);
      }
    } catch (error) {
      console.error('Erro ao excluir pedido:', error);
    }
  };

  return (
    <div className="modalCarrinho">
      <div className="modal-contentCarrinho">
        {loading && <div>Carregando pedidos...</div>}
        {error && <div>{error}</div>}
        {!loading && !error && (
          <>
            <h2>Carrinho de Compras</h2>
            <h3>Pedidos:</h3>
            {orders.length > 0 ? (
              orders.map(order => (
                <div key={order.IdPedido} className="order-container">
                  <p className="order-title">
                    Pedido ID: {order.IdPedido}, Data: {order.DataPedido}
                  </p>
                  <ul>
                    {order.items.map(item => (
                      <li key={item.IdPedidoItem}>
                        <span className="item-name">{item.nome}</span>
                        <div className='item-quantidade'>
                        <span>Quantidade: {item.Quantidade}</span>
                        <button className='buttonQuantidade' onClick={() => handleIncrement(item.IdPedidoItem)}>+</button>
                        <button className='buttonQuantidade' onClick={() => handleDecrement(item.IdPedidoItem)}>-</button>
                        </div>
                        <span className='item-preco'>Preço: R$ {item.Preco}</span>

                        <span className='valorTotal'>Valor Total: R$ {order.ValorTotal}</span>

                        <button className='buttonDelete' onClick={() => handleDeleteOrder(order.IdPedido)}>Excluir Pedido</button>
                      </li>
                    ))}
                  </ul>
                </div>
              ))
            ) : (
              <p>Nenhum pedido encontrado.</p>
            )}
          </>
        )}
        <span className="ButtoncloseCarrinho" onClick={onClose}>
          &times;
        </span>
      </div>
    </div>
  );
};

export default CarrinhoModal;
