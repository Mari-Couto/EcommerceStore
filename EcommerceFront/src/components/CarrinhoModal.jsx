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
    fetchOrderDetails();
  }, []);

  const fetchOrderDetails = async () => {
    setLoading(true);
    setError(null);
    try {
      const currentOrder = JSON.parse(localStorage.getItem('currentOrder'));
      if (currentOrder) {
        const [productNamesResponse, orderItemsResponse] = await Promise.all([
          axios.get(`http://localhost:3000/produtos?Ids=${currentOrder.items.map(item => item.IdProduto).join(',')}`),
          axios.get(`http://localhost:3000/pedidosItens?IdPedido=${currentOrder.IdPedido}`)
        ]);

        const products = productNamesResponse.data;
        const itemsData = orderItemsResponse.data;

        if (!Array.isArray(itemsData)) {
          throw new Error('Dados inválidos recebidos da API');
        }

        const updatedItems = itemsData.map(item => {
          const product = products.find(p => p.IdProduto === item.IdProduto);
          return product ? { ...item, nome: product.nome, Preco: product.precoProduto } : item;
        });

        setOrder({
          ...currentOrder,
          items: updatedItems
        });

        calculateTotalValue(updatedItems);
      } else {
        setOrder(null);
      }
    } catch (error) {
      setError(error.message || 'Erro ao buscar detalhes do pedido');
    } finally {
      setLoading(false);
    }
  };

  const calculateTotalValue = (items) => {
    const total = items.reduce((sum, item) => sum + item.Preco * item.Quantidade, 0);
    setTotalValue(total);
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
      await createNewOrder();
    } catch (error) {
      console.error('Erro ao excluir pedido:', error);
    }
  };

  const createNewOrder = async () => {
    try {
      const response = await axios.post('http://localhost:3000/pedidos');
      return response.data;
    } catch (error) {
      console.error('Erro ao criar novo pedido:', error);
      throw error;
    }
  };

  const handleCancelDelete = () => {
    setShowConfirmationModal(false);
  };

  const handleIncrement = async (IdPedidoItem, quantidade) => {
    try {
      const response = await axios.patch(`http://localhost:3000/pedidosItens/${IdPedidoItem}`, { Quantidade: quantidade + 1 });
      if (response.status === 200) {
        fetchOrderDetails();
      }
    } catch (error) {
      console.error('Erro ao incrementar a quantidade do item de pedido:', error);
    }
  };

  const handleDecrement = async (IdPedidoItem, quantidade) => {
    if (quantidade > 1) {
      try {
        const response = await axios.patch(`http://localhost:3000/pedidosItens/${IdPedidoItem}`, { Quantidade: quantidade - 1 });
        if (response.status === 200) {
          fetchOrderDetails();
        }
      } catch (error) {
        console.error('Erro ao decrementar a quantidade do item de pedido:', error);
      }
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
                        <button className="buttonQuantidade" onClick={() => handleIncrement(item.IdPedidoItem, item.Quantidade)}>+</button>
                        <button className="buttonQuantidade" onClick={() => handleDecrement(item.IdPedidoItem, item.Quantidade)}>-</button>
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
