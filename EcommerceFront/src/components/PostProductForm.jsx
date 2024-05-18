import React, { useState } from 'react';
import axios from 'axios';
import './PostProductForm.css';

const url = 'http://localhost:3000/produtos';

const PostProductForm = ({ onClose }) => {
  const [productData, setProductData] = useState({
    nome: '',
    precoProduto: '',
    descricao: '',
    quantidadeEstoque: '',
    IdCategoria: '',
    file: null,
  });

  const [message, setMessage] = useState('');
  const [fileName, setFileName] = useState('');

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === 'file') {
      setProductData((prevData) => ({
        ...prevData,
        [name]: files[0],
      }));
    } else {
      setProductData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
    const file = e.target.files[0];
    if (file) {
      setFileName(file.name);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('nome', productData.nome);
      formData.append('precoProduto', productData.precoProduto);
      formData.append('descricao', productData.descricao);
      formData.append('quantidadeEstoque', productData.quantidadeEstoque);
      formData.append('IdCategoria', productData.IdCategoria);
      formData.append('file', productData.file);

      await axios.post(url, formData, { 
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      setMessage('Produto inserido com sucesso.');
      setProductData({ nome: '', precoProduto: '', descricao: '', quantidadeEstoque: '', IdCategoria: '', file: null });
    } catch (error) {
      console.error('Erro ao inserir produto:', error);
      console.error('Detalhes do erro:', error.response?.data);
      setMessage('Erro ao inserir produto. Por favor, tente novamente.');
    }
  };

  return (
    <div className="post-product-form">
      <h2>Postar Produto</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Nome:
          <input type="text" name="nome" value={productData.nome} onChange={handleChange} required />
        </label>
        <label>
          Preço:
          <input type="number" name="precoProduto" value={productData.precoProduto} onChange={handleChange} required />
        </label>
        <label>
          Descrição:
          <textarea name="descricao" value={productData.descricao} onChange={handleChange} required />
        </label>
        <label>
          Quantidade no estoque:
          <input type="number" name="quantidadeEstoque" value={productData.quantidadeEstoque} onChange={handleChange} required />
        </label>
        <label>
          Categoria:
          <input type="text" name="IdCategoria" value={productData.IdCategoria} onChange={handleChange} required />
        </label>
        <label className="file-label">
          Selecione a imagem:
          <input type="file" name="file" className="file-input" onChange={handleChange} required />
        </label>
        {fileName && <p>Arquivo selecionado: {fileName}</p>}
       <div className='button-containerPost'>
       <button type="submit" className='yesbuttonPost'>Postar</button>
        <button type="button" onClick={onClose} className='notbuttonPost'>Cancelar</button>
       </div>
      </form>
      {message && <p className='message'>{message}</p>}
    </div>
  );
};

export default PostProductForm;
