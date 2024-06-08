const postOrder = async (product) => {
  try {
    let currentOrder = JSON.parse(localStorage.getItem('currentOrder'));

    if (!currentOrder) {
      currentOrder = {
        IdPedido: null,
        items: []
      };
    } else if (!currentOrder.items) {
      currentOrder.items = [];
    }

    currentOrder.items.push({
      IdProduto: product.idProduto,
      Nome: product.nomeProduto,
      Quantidade: 1,
      Preco: product.precoProduto
    });

    localStorage.setItem('currentOrder', JSON.stringify(currentOrder));

    return currentOrder.IdPedido;
  } catch (error) {
    console.error('Erro ao inserir pedido:', error);
    throw error;
  }
};

export default postOrder;
