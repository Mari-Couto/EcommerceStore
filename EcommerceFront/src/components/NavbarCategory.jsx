import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import './Navbar.css';
import CategoryCard from './CategoryCard';

const NavbarCategory = () => {
  const [message, setMessage] = useState('');
  const [showPostForm, setShowPostForm] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState('');
  const [categories, setCategories] = useState([]);

  const handleSearchChange = (event) => {e
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
    } catch (error) {
    }
  };

  const handlePostButtonClick = () => {
    setShowPostForm(!showPostForm); 
  };

  const handleNewCategoryNameChange = (event) => {
    setNewCategoryName(event.target.value);
  };

  const handlePostCategory = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/categoria', { nomeCategoria: newCategoryName });
      setCategories([...categories, response.data]);
      setNewCategoryName('');
      setShowPostForm(false);
      setMessage('Categoria criada com sucesso.');
    } catch (error) {
      setMessage('Erro ao criar categoria. Por favor, tente novamente.');
    }
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
              onChange={handleSearchChange}
            />
            <button type="submit">
              <FontAwesomeIcon icon={faSearch} />
            </button>
          </form>
        </div>
        <div className="navbar-icons">
          <button className="postar-produto-button" onClick={handlePostButtonClick}>
            {showPostForm ? 'Fechar Formulário' : 'Postar Categoria'}
          </button>
        </div>
      </nav>

      {showPostForm && (
        <div className="post-product-form">
          <h2>Nova Categoria</h2>
          <form onSubmit={handlePostCategory}>
            <label htmlFor="categoryName">Nome da Categoria</label>
            <input
              type="text"
              id="categoryName"
              placeholder="Nome da nova categoria"
              value={newCategoryName}
              onChange={handleNewCategoryNameChange}
              required
            />
            <div className="button-containerPost">
              <button type="submit" className="yesbuttonPost">Postar Categoria</button>
              <button type="button" className="notbuttonPost" onClick={handlePostButtonClick}>Cancelar</button>
            </div>
          </form>
        </div>
      )}

      {message && <div className="message">{message}</div>}
    </div>
  );
};

export default NavbarCategory;
