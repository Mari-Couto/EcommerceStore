import { useState } from 'react';
import './ProductsHome.css';

const OneProductsHome = ({ products }) => {
    const [orderStatus, setOrderStatus] = useState(null); 

    const handleBuyButtonClick = async (product) => {
        try {
          const response = await axios.post('http://localhost:3000/orders', {
            productId: product.idProduto,
            quantity: 1 
          });
          setOrderStatus(`Pedido inserido com sucesso! ID do Pedido: ${response.data.IdPedido}`);
        } catch (error) {
          setOrderStatus('Erro ao inserir pedido. Tente novamente.');
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
