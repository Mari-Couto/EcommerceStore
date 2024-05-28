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
  const [newCategoryName, setNewCategoryName] = useState('');
  const [categories, setCategories] = useState([]);

  const fetchData = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/categoria/${searchId}`);
      setSearchResult(response.data);
      setMessage('');
    } catch (error) {
      setSearchResult(null);
      setMessage('Categoria não encontrada.');
    }
  };

  const handleSearchChange = (event) => {
    setSearchId(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    fetchData();
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
          <Link to="/">Produtos</Link>
          <Link to="/categoria">Categoria</Link>
          <a href="#contact-section">Contato</a>
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

      {showPostForm && (
        <div className="post-form">
          <form onSubmit={handlePostCategory}>
            <input
              type="text"
              placeholder="Nome da nova categoria"
              value={newCategoryName}
              onChange={handleNewCategoryNameChange}
              required
            />
            <button type="submit">Postar Categoria</button>
          </form>
        </div>
      )}

      {message && <div className="search-message">{message}</div>}

      {searchResult && (
        <CategoryCard
          category={searchResult}
          onDelete={handleDelete}
          isSearchResult={true} 
        />
      )}

      <div className="category-list">
        {categories.map(category => (
          <CategoryCard key={category.IdCategoria} category={category} onDelete={handleDelete} />
        ))}
      </div>
    </div>
  );
};

export default NavbarCategory;
