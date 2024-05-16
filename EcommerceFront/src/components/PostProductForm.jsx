import React, { useState } from 'react';
import axios from 'axios';
import './PostProductForm.css';

const url = 'http://localhost:3000/produtos';

const PostProductForm = ({ onClose }) => {
  const [productData, setProductData] = useState({
    nome: '',
    precoProduto: '',
    descricao: '',
    quantidadeestoque: '',
    IdCategoria: '',
    file: null,
  });

  const [message, setMessage] = useState('');

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
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      for (const key in productData) {
        formData.append(key, productData[key]);
      }

      for (let [key, value] of formData.entries()) {
        console.log(`${key}: ${value}`);
      }

      const response = await axios.post(url, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log('Server response:', response);

      setMessage('Produto inserido com sucesso.');
      setProductData({
        nome: '',
        precoProduto: '',
        descricao: '',
        quantidadeestoque: '',
        IdCategoria: '',
        file: null,
      });
    } catch (error) {
      if (error.response) {
        console.error('Erro ao inserir produto:', error.response.data);
        setMessage(`Erro ao inserir produto: ${error.response.data.message}`);
      } else {
        console.error('Erro ao inserir produto:', error.message);
        setMessage('Erro ao inserir produto. Por favor, tente novamente.');
      }
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
          <input type="number" name="quantidadeestoque" value={productData.quantidadeestoque} onChange={handleChange} required />
        </label>
        <label>
          Categoria:
          <input type="text" name="IdCategoria" value={productData.IdCategoria} onChange={handleChange} required />
        </label>
        <label>
          Imagem:
          <input type="file" name="file" onChange={handleChange} required />
        </label>
        <button type="submit">Postar</button>
        <button type="button" onClick={onClose}>Cancelar</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default PostProductForm;
