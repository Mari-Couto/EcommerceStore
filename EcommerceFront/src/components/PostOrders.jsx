import axios from 'axios';

const postOrder = async (product) => {
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

    return orderResponse.data;
  } catch (error) {
    console.error('Erro ao inserir pedido:', error);
    throw error;
  }
};

export default postOrder;
