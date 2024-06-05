import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faShoppingCart, faSearch } from '@fortawesome/free-solid-svg-icons';
import OneProductsHome from './OneProductHome';
import ProductsHome from './ProductsHome';
import CarrinhoModal from './CarrinhoModal';
import axios from 'axios';
import './Navbar.css'; 

const Navbar = () => {
  const [openModal, setOpenModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [products, setProducts] = useState([]);
  const [showOneProduct, setShowOneProduct] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("Search query submitted:", searchQuery);
    if (searchQuery.trim() === '') {
      setMessage('Por favor, insira um termo de pesquisa.');
      setShowOneProduct(false);
      return;
    }
    try {
      const response = await axios.get(`http://localhost:3000/produtos/busca/${searchQuery}`);
      console.log("Response from server:", response.data);
      if (response.data.length === 0) {
        setMessage('Produto não encontrado');
        setShowOneProduct(false);
      } else {
        setProducts(response.data);
        setShowOneProduct(true);
        setMessage('');
      }
    } catch (error) {
      console.error("Error fetching product:", error);
      setMessage('Erro ao buscar o produto');
      setShowOneProduct(false);
    }
    setSearchQuery('');
  };

  const handleCartClick = (event) => {
    event.preventDefault(); 
    setOpenModal((prevOpenModal) => !prevOpenModal); 
  };

  console.log("showOneProduct:", showOneProduct);
  console.log("products:", products);

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
          <Link to="/Categorias">Categorias</Link>
          <Link to="/sobre">Sobre</Link>
          <a href="#contact-section">Contato</a>
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

      {message && <div className="messageProduto">{message}</div>}

      {showOneProduct ? (
        <OneProductsHome products={products} onClose={() => setShowOneProduct(false)} />
      ) : (
        <ProductsHome />
      )}
    </div>
  );
}

export default Navbar;
