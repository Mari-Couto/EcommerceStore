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

  return (
    <div className="modalCarrinho">
      <div className="modal-contentCarrinho">
        {loading && <div>Carregando pedidos...</div>}
        {error && <div>{error}</div>}
        {!loading && !error && (
          <>
            <h2>Carrinho de Compras</h2>
            <h4>Pedidos:</h4>
            {orders.length > 0 ? (
              orders.map(order => (
                <div key={order.IdPedido}>
                  <p>
                    Pedido ID: {order.IdPedido}, Data: {order.DataPedido}, Valor Total: R$ {order.ValorTotal}
                  </p>
                  <h4>Itens:</h4>
                  <ul>
                    {order.items.map(item => (
                      <li key={item.IdPedidoItem}>
                        {item.nome}, Quantidade: {item.Quantidade}, Preço: R$ {item.Preco}
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
