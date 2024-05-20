class PedidosItens {
    constructor(nome, IdPedidoItem, IdPedido, IdProduto, Quantidade, Preco, file) {
        this.nome = nome;
        this.IdPedidoItem = IdPedidoItem;
        this.IdPedido = IdPedido;
        this.IdProduto = IdProduto;
        this.Quantidade = Quantidade;
        this.Preco = Preco;
        this.file = file;
    }
}

module.exports = PedidosItens;
