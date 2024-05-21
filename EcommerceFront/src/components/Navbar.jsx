import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faShoppingCart, faSearch } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import './Navbar.css'; 
import CarrinhoModal from './CarrinhoModal';
import axios from 'axios';
import OneProductsHome from './OneProductHome';

const Navbar = () => {
  const [openModal, setOpenModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [products, setProducts] = useState([]);
  const [showPostForm, setShowPostForm] = useState(false);
  
  const handlePostButtonClick = () => {
    setShowPostForm(!showPostForm); 
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.get(`http://localhost:3000/produtos/busca/${searchQuery}`);
      setProducts(response.data);
      setShowPostForm(true); // Mostrar os produtos encontrados
      console.log("Produtos encontrados:", response.data);
    } catch (error) {
      console.error("Erro ao buscar produtos:", error);
    }
  };

  const handleCartClick = (event) => {
    event.preventDefault(); 
    setOpenModal(true); 
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
          <Link to="/sobre">Sobre</Link>
          <Link to="/contato">Contato</Link>
        </div>
        <div className="navbar-search">
          <form onSubmit={handleSubmit}>
            <input 
              type="text" 
              value={searchQuery}
              placeholder="Buscar por nome..." 
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
    
      {showPostForm && <OneProductsHome products={products} onClose={() => setShowPostForm(false)} />}
    </div>
  );
}

export default Navbar;
