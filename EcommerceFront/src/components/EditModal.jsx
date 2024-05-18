import React, { useState } from 'react';
import axios from 'axios';
import './EditModal.css';

const EditModal = ({ isOpen, onClose, productId }) => {
    const [productNome, setProductNome] = useState('');
    const [productDescricao, setProductDescricao] = useState('');
    const [productPreco, setProductPreco] = useState('');
    const [productQuantidade, setProductQuantidade] = useState('');
    const [productIdCategoria, setProductIdCategoria] = useState('');
    const [productImagem, setProductImagem] = useState(null);
    const [message, setMessage] = useState('');
    const [messageType, setMessageType] = useState('');
    const [fileName, setFileName] = useState('');


    const handleChange = (e) => {
        const { name, value, files } = e.target;
        switch (name) {
            case 'productNome':
                setProductNome(value);
                break;
            case 'productDescricao':
                setProductDescricao(value);
                break;
            case 'productPreco':
                setProductPreco(value);
                break;
            case 'productQuantidade':
                setProductQuantidade(value);
                break;
            case 'productIdCategoria':
                setProductIdCategoria(value);
                break;
            case 'file':
                setProductImagem(files[0]);
                break;
            default:
                break;
        }
        const file = e.target.files[0];
        if (file) {
          setFileName(file.name);
        }
    };

    const handleEdit = async (e) => {
        e.preventDefault();
    
        try {
            console.log('Enviando requisição PATCH para atualizar o produto...');
            const formData = new FormData();
            formData.append('nome', productNome);
            formData.append('precoProduto', productPreco);
            formData.append('descricao', productDescricao);
            formData.append('quantidadeEstoque', productQuantidade);
            formData.append('IdCategoria', productIdCategoria);
            if (productImagem) {
                formData.append('file', productImagem);
            }
    
            const response = await axios.patch(`http://localhost:3000/produtos/${productId}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
    
            console.log('Resposta da API:', response.data);
            setMessage(response.data.message);
            setMessageType('success');
            setProductNome('');
            setProductDescricao('');
            setProductPreco('');
            setProductQuantidade('');
            setProductIdCategoria('');
            setProductImagem(null);
        } catch (error) {
            console.error('Erro ao atualizar produto:', error);
            setMessage('Erro ao atualizar produto.');
            setMessageType('error');
        }
    };

    if (isOpen) {
        return (
            <div className='background'>
                <div className='modal'>
                    <div className="form-container">
                        <h2>Alterar Produto</h2>
                        <form onSubmit={handleEdit}>
                            <div className="form">
                                <div>
                                <label>Novo Nome:</label>
                                <input type="text" name="productNome" value={productNome} onChange={handleChange} />
                            </div>
                            <div>
                                <label>Nova Descrição:</label>
                                <textarea name="productDescricao" value={productDescricao} onChange={handleChange} />
                            </div>
                            <div>
                                <label>Novo Preço:</label>
                                <input type="number" name="productPreco" value={productPreco} onChange={handleChange} />
                            </div>
                            <div>
                                <label>Novo estoque:</label>
                                <input type="number" name="productQuantidade" value={productQuantidade} onChange={handleChange} />
                            </div>
                            <div>
                                <label>Nova Categoria por ID:</label>
                                <input type="number" name="productIdCategoria" value={productIdCategoria} onChange={handleChange} />
                            </div>
                            <div>
                            <label className="file-labelEdit">
                             Selecione a imagem:
                           <input type="file" name="file" className="file-inputEdit" onChange={handleChange} required />
                            </label>
                           {fileName && <p className='messageFile'>Arquivo selecionado: {fileName}</p>}
                            </div>
                            </div>
                            <button type="submit" className='submit'>Atualizar Produto</button>
                        </form>
                        {message && <p className={messageType === 'success' ? 'success-message' : 'error-message'}>{message}</p>}
                   </div>

                    <div className="close">
                        <button onClick={onClose} className="Buttonclose">Fechar</button>
                    </div>
                </div>
            </div>
        );
    }

    return null;
};

export default EditModal;
