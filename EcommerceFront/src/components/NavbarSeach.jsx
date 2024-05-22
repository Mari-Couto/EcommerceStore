import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import './Navbar.css';
import ProductCard from './ProductCard';
import PostProductForm from './PostProductForm';

const NavbarSearch = () => {
  const [IdProduct, setIdProduct] = useState('');
  const [product, setProduct] = useState(null);
  const [message, setMessage] = useState('');
  const [showPostForm, setShowPostForm] = useState(false);

  const handleSearchChange = (event) => {
    setIdProduct(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.get(`http://localhost:3000/produtos/${IdProduct}`);
      const productData = response.data;
      let imageUrl = null;
      if (productData.file) {
        imageUrl = `http://localhost:3000/produtos/imagem/${productData.idProduto}`;
      }
      setProduct({ ...productData, imageUrl });
      setMessage('');
    } catch (error) {
      console.error('Erro ao buscar produto:', error);
      setMessage(`Produto com ID #${IdProduct} não encontrado`);
      setProduct(null);
    }
  };

  const handlePostButtonClick = () => {
    setShowPostForm(!showPostForm); 
  };

  return (
    <div>
      <nav className="navbar">
        <div className="navbar-logo">
          <Link to="/" className="logo-text">
            ShopEase
          </Link>
        </div>
        <div className="navbar-links">
          <Link to="/">Início</Link>
          <Link to="/produtos">Produtos</Link>
          <Link to="/Categoria">Categoria</Link>
          <Link to="/contato">Contato</Link>
        </div>
        <div className="navbar-search">
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Buscar por Id..."
              value={IdProduct}
              onChange={handleSearchChange}
            />
            <button type="submit">
              <FontAwesomeIcon icon={faSearch} />
            </button>
          </form>
        </div>
        <div className="navbar-icons">
          <button className="postar-produto-button" onClick={handlePostButtonClick}>
            {showPostForm ? 'Fechar Formulário' : 'Postar Produto'}
          </button>
        </div>
      </nav>

      {message && <div className="search-message">{message}</div>}
      {product && <ProductCard product={product} onEdit={() => {}} />}
      {showPostForm && <PostProductForm onClose={() => setShowPostForm(false)} />}
    </div>
  );
};

export default NavbarSearch;
