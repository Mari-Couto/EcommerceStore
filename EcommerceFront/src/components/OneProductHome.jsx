import { useState } from 'react';
import axios from 'axios'; 

const OneProductsHome = ({ products }) => {
    const [orderStatus, setOrderStatus] = useState(null); 

    const handleBuyButtonClick = async (product) => {
      try {
        const orderResponse = await axios.post('http://localhost:3000/pedidos', {
          produtoId: product.idProduto,
          quantidade: 1,
          preco: product.precoProduto,
        });
    
        const orderId = orderResponse.data.IdPedido;
    
        await axios.post('http://localhost:3000/pedidosItens', {
          IdPedido: orderId,
          IdProduto: product.idProduto,
          Quantidade: 1,
          Preco: product.precoProduto,
        });
          setOrderStatus(`Pedido inserido com sucesso! ID do Pedido: ${orderResponse.data.IdPedido}`);
        } catch (error) {
          setOrderStatus('Erro ao inserir pedido. Tente novamente.');
          console.log(error)
        }
      };

  return (
    <div className="catalog">
      {products.map(product => (
        <div key={product.idProduto} className="card-product">
          <div className="image-container">
            {product.file && <img src={`http://localhost:3000/produtos/imagem/${product.idProduto}`} alt={product.nome} className="image" />}
          </div>
          <div className="products">
            <h3>{product.nome}</h3>
            <p>Preço: R$ {product.precoProduto}</p>
            <p>{product.descricao}</p>
            <button className="buy-button" onClick={() => handleBuyButtonClick(product)}>Comprar</button>
            {orderStatus && <div className="order-status">{orderStatus}</div>}
          </div>
        </div>
      ))}
    </div>
  );
} 

export default OneProductsHome;
