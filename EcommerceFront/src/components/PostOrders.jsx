  import axios from 'axios';

  const createNewOrder = async () => {
    try {
      const response = await axios.post('http://localhost:3000/pedidos');
      console.log('Resposta ao criar novo pedido:', response.data);
      return { data: response.data };
    } catch (error) {
      console.error('Erro ao criar novo pedido:', error);
      throw error;
    }
  };

  const postOrder = async (product) => {
    try {
      let currentOrder = JSON.parse(localStorage.getItem('currentOrder'));

      if (!currentOrder || !currentOrder.IdPedido) {
        const newOrderResponse = await createNewOrder();
        console.log('Novo pedido criado:', newOrderResponse.data);
        currentOrder = {
          IdPedido: newOrderResponse.data.IdPedido,
          items: []
        };
      } else if (!currentOrder.items) {
        currentOrder.items = [];
      }

      currentOrder.items.push({
        IdProduto: product.idProduto,
        Nome: product.nome,
        Quantidade: 1,
        Preco: product.precoProduto
      });

      localStorage.setItem('currentOrder', JSON.stringify(currentOrder));

      const itemData = {
        IdProduto: product.idProduto,
        Quantidade: 1,
        Preco: product.precoProduto, 
        IdPedido: currentOrder.IdPedido 
      };
      

      console.log('Enviando dados para a API:', itemData);

      await axios.post(
      `http://localhost:3000/pedidosItens/${currentOrder.IdPedido}`,
        itemData,
        { headers: { 'Content-Type': 'application/json' } }
      );

      return currentOrder.IdPedido;
    } catch (error) {
      if (error.response) {
        console.log('Erro ao inserir pedido:', error.response.data);
        console.log('Status:', error.response.status);
        console.log('Cabeçalhos:', error.response.headers);
      } else if (error.request) {
        console.log('Erro ao inserir pedido:', error.request);
      } else {
        console.log('Erro ao configurar requisição:', error.message);
      }
      console.log('Configuração da requisição:', error.config);
      throw error;
    }
  };

  export default postOrder;
