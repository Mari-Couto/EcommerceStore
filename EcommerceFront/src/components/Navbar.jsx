import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faShoppingCart, faSearch } from '@fortawesome/free-solid-svg-icons';
import './Navbar.css'; 

const Navbar = () => {
  const handleSearch = (event) => {
    console.log("Pesquisa:", event.target.value);
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Enviar formulário de pesquisa");
  }

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/" className="logo-text">
          ShopEase
        </Link>
      </div>
      <div className="navbar-links">
        <Link to="/">Início</Link>
        <Link to="/produtos">Produtos</Link>
        <Link to="/sobre">Sobre</Link>
        <Link to="/contato">Contato</Link>
      </div>
      <div className="navbar-search">
        <form onSubmit={handleSubmit}>
          <input type="text" placeholder="Buscar..." onChange={handleSearch} />
          <button type="submit">
            <FontAwesomeIcon icon={faSearch} />
          </button>
        </form>
      </div>
      <div className="navbar-icons">
        <Link to="/perfil">
          <FontAwesomeIcon icon={faUser} />
        </Link>
        <Link to="/carrinho">
          <FontAwesomeIcon icon={faShoppingCart} />
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
