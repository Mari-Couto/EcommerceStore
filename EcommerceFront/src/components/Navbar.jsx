import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faInstagram, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { faUser, faShoppingCart, faSearch } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import './Navbar.css'; 
import CarrinhoModal from './CarrinhoModal';

const Navbar = ({ setShowPostForm, setProducts, setMessage }) => {
  const [openModal, setOpenModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [messageTimeout, setMessageTimeout] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (searchQuery.trim() === '') {
      setProducts([]);
      setShowPostForm(false);
      setErrorMessage('');
      return;
    }
    try {
      const response = await axios.get(`http://localhost:3000/produtos/busca/${searchQuery}`);
      if (response.data.length === 0) {
        setErrorMessage('Produto não encontrado');
        setProducts([]);
        setShowPostForm(false);
        if (messageTimeout) {
          clearTimeout(messageTimeout);
        }
        setMessageTimeout(setTimeout(() => {
          setErrorMessage('');
        }, 2000)); 
      } else {
        setProducts(response.data);
        setShowPostForm(true);
        setErrorMessage('');
      }
    } catch (error) {
      setErrorMessage('Produto não encontrado!');
      if (messageTimeout) {
        clearTimeout(messageTimeout);
      }
      setMessageTimeout(setTimeout(() => {
        setErrorMessage('');
      }, 2000)); 
    }
    setSearchQuery('');
  };

  const handleCartClick = (event) => {
    event.preventDefault();
    setOpenModal((prevOpenModal) => !prevOpenModal);
  };

  const handleLogoClick = () => {
    if (typeof setProducts === 'function') {
      setProducts([]);
    }
    if (typeof setShowPostForm === 'function') {
      setShowPostForm(false);
    }
    if (typeof setMessage === 'function') {
      setMessage('');
    }
    if (messageTimeout) {
      clearTimeout(messageTimeout);
    }
    setErrorMessage('');
  };

  return (
    <div>
      <nav className="navbar">
        <div className="navbar-logo">
          <Link to="/" className="logo-text" onClick={handleLogoClick}>
            ShopEase
          </Link>
        </div>
        <div className="navbar-links">
          <p>
            Nos sigam em todas as redes sociais
            <a href="https://www.facebook.com/shopease" target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon={faFacebook} className="fa-icon" />
            </a>
            <a href="https://www.instagram.com/shopease" target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon={faInstagram} className="fa-icon" />
            </a>
            <a href="https://www.twitter.com/shopease" target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon={faTwitter} className="fa-icon" />
            </a>
          </p>
        </div>
        <div className="navbar-search">
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              value={searchQuery}
              placeholder="Busque seu Produto..."
              onChange={(ev) => setSearchQuery(ev.target.value)}
            />
            <button type="submit">
              <FontAwesomeIcon icon={faSearch} />
            </button>
          </form>
        </div>
        <div className="navbar-icons">
          <Link to="/produtos">
            <FontAwesomeIcon icon={faUser} />
          </Link>
          <a href="/carrinho" onClick={handleCartClick}>
            <FontAwesomeIcon icon={faShoppingCart} />
          </a>
        </div>

        {openModal && <CarrinhoModal onClose={() => setOpenModal(false)} />}
      </nav>
      <div className="navbar-links-bottom">
        <Link to="/Categorias/7/produtos">Decoração</Link>
        <Link to="/Categorias/8/produtos">Vestiário</Link>
        <Link to="/Categorias/10/produtos">Calçados</Link>
        <Link to="/Categorias/11/produtos">Tecnologia</Link>
        <Link to="/Categorias/14/produtos">Material escolar</Link>
        <Link to="/Categorias/17/produtos">Cama e banho</Link>
      </div>

      {errorMessage && (
        <div className="error-message">
          {errorMessage}
        </div>
      )}
    </div>
  );
};

export default Navbar;
