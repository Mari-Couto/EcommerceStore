import axios from 'axios';

const postOrder = async (product) => {
  try {
    const response = await axios.post('http://localhost:3000/pedidos', {
      produtoId: product.idProduto,
      quantidade: 1, 
      preco: product.precoProduto,
    });
    return response.data;
  } catch (error) {
    console.error('Erro ao inserir pedido:', error);
    throw error;
  }
};

export default postOrder;
