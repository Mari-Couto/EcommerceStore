import { useState, useEffect } from 'react';
import axios from 'axios'; 
import './ProductsHome.css';

const OneProductsCategory = ({ products }) => {
  const [productsWithImages, setProductsWithImages] = useState([]);
  const [orderStatuses, setOrderStatuses] = useState({});

  useEffect(() => {
    async function fetchProductsWithImages() {
      try {
        const updatedProducts = products.map(product => {
          let imageUrl = product.fileLink ? `http://localhost:3000${product.fileLink}` : null;
          return {
            ...product,
            imageUrl: imageUrl
          };
        });
        setProductsWithImages(updatedProducts);
      } catch (error) {
        console.error('Erro ao buscar imagens dos produtos:', error);
      }
    }

    fetchProductsWithImages();
  }, [products]);

  const handleBuyButtonClick = async (product) => {
    try {
      const orderResponse = await axios.post('http://localhost:3000/pedidos', {
        produtoId: product.IdProduto,
        quantidade: 1,
        preco: product.precoProduto,
      });

      const orderId = orderResponse.data.IdPedido;

      const itemPayload = {
        IdPedido: orderId,
        IdProduto: product.IdProduto,
        Quantidade: 1,
        Preco: product.precoProduto,
      };

      await axios.post('http://localhost:3000/pedidosItens', itemPayload);

      setOrderStatuses(prevStatuses => ({
        ...prevStatuses,
        [product.IdProduto]: { message: `Pedido inserido com sucesso! ID do Pedido: ${orderResponse.data.IdPedido}`, isSuccess: true }
      }));
    } catch (error) {
      setOrderStatuses(prevStatuses => ({
        ...prevStatuses,
        [product.IdProduto]: { message: 'Erro ao inserir pedido. Tente novamente.', isSuccess: false }
      }));
    }
  };

  return (
    <div className="catalog">
      {productsWithImages.map(product => (
        <div key={product.IdProduto} className="card-product">
          <div className="image-container">
            {product.imageUrl ? (
              <img 
                src={product.imageUrl} 
                alt={product.nome} 
                className="image" 
                onError={(e) => {
                  console.error('Erro ao carregar a imagem:', e.target.src);
                  e.target.onerror = null; 
                  e.target.src = 'fallback-image-url'; 
                }} 
              />
            ) : (
              <p>Imagem não disponível</p>
            )}
          </div>
          <div className="products">
            <h3>{product.nome}</h3>
            <p>Preço: R$ {product.precoProduto}</p>
            <p>{product.descricao}</p>
            <button className="buy-button" onClick={() => handleBuyButtonClick(product)}>Comprar</button>
            {orderStatuses[product.IdProduto] && (
              <div className={`order-status ${orderStatuses[product.IdProduto].isSuccess ? 'success' : 'error'}`}>
                {orderStatuses[product.IdProduto].message}
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default OneProductsCategory;
