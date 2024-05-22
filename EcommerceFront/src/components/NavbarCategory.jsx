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
  const [searchId, setSearchId] = useState('');
  const [searchResult, setSearchResult] = useState(null);

  const handleSearchChange = (event) => {
    setSearchId(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.get(`http://localhost:3000/categoria/${searchId}`);
      setSearchResult(response.data);
      setMessage('');
    } catch (error) {
      setSearchResult(null);
      setMessage('Categoria não encontrada.');
    }
  };

  const handlePostButtonClick = () => {
    setShowPostForm(!showPostForm); 
  };

  const handleDelete = (deletedId) => {
    if (searchResult && searchResult.IdCategoria === deletedId) {
      setSearchResult(null);
      setMessage('Categoria excluída com sucesso.');
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
              value={searchId}
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

      {message && <div className="search-message">{message}</div>}

      {searchResult && (
        <CategoryCard 
          category={searchResult} 
          onDelete={handleDelete} 
        />
      )}
    </div>
  );
};

export default NavbarCategory;
