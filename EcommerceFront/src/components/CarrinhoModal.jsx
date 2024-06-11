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

  const fetchOrder = async () => {
    setLoading(true);
    try {
      const currentOrder = JSON.parse(localStorage.getItem('currentOrder'));
      if (currentOrder) {
        setOrder(currentOrder);
        await Promise.all([
          fetchProductNames(currentOrder.items),
          fetchOrderItems(currentOrder.IdPedido) 
        ]);
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
        const productResponse = await axios.get(`http://localhost:3000/produtos/${item.IdProduto}`);
        const product = productResponse.data;
        return { ...item, nome: product.nome, Preco: product.precoProduto }; 
      }));
      setOrder((prevOrder) => ({
        ...prevOrder,
        items: updatedItems
      }));
      calculateTotalValue(updatedItems); 
    } catch (error) {
      console.error('Erro ao buscar nomes e preços dos produtos:', error);
    }
  };

  const fetchOrderItems = async (orderId) => {
    try {
      const itemsResponse = await axios.get(`http://localhost:3000/pedidosItens?IdPedido=${orderId}`);
      const itemsData = itemsResponse.data;
      if (!Array.isArray(itemsData)) {
        throw new Error('Dados inválidos recebidos da API');
      }
      setOrder((prevOrder) => ({
        ...prevOrder,
        items: itemsData
      }));
      calculateTotalValue(itemsData); 
    } catch (error) {
      console.error('Erro ao buscar itens do pedido:', error);
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
        fetchOrder(); 
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
          fetchOrder(); 
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
