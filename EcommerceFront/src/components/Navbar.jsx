import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faShoppingCart, faSearch } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import './Navbar.css'; 
import CarrinhoModal from './CarrinhoModal';

const Navbar = () => {
  const [openModal, setOpenModal] = useState(false);

  const handleSearch = (event) => {
    console.log("Pesquisa:", event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Enviar formulário de pesquisa");
  };

  const handleCartClick = (event) => {
    event.preventDefault(); 
    setOpenModal(true); 
  };

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
        <Link to="/produtos">
          <FontAwesomeIcon icon={faUser} />
        </Link>
        <a href="/carrinho" onClick={handleCartClick}>
          <FontAwesomeIcon icon={faShoppingCart} />
        </a>
      </div>

      {openModal && <CarrinhoModal onClose={() => setOpenModal(false)} />}
    </nav>
  );
}

export default Navbar;
