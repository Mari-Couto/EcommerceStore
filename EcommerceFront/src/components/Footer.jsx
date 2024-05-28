import React from 'react';
import './Footer.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faInstagram, faTwitter } from '@fortawesome/free-brands-svg-icons';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section about">
          <h2>ShopEase</h2>
          <p>ShopEase é sua loja online de confiança, oferecendo diversos produtos de qualidade, com os melhores preços do mercado.</p>
        </div>
        <div className="footer-section links">
          <h2>Links Úteis</h2>
          <ul>
            <li><a href="/sobre-nos">Sobre Nós</a></li>
            <li><a href="#contact-section">Contato</a></li>
            <li><a href="/produtos">Produtos</a></li>
            <li><a href="/Categorias">Categorias</a></li>
          </ul>
        </div>
        <div className="footer-section social">
          <h2>Siga-nos</h2>
          <div className="social-links">
          <p>  <a href="https://www.facebook.com/shopease" target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon={faFacebook} className="fa-icon" /> Facebook
            </a></p>
          <p>  <a href="https://www.instagram.com/shopease" target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon={faInstagram} className="fa-icon" /> Instagram
            </a></p>
          <p>  <a href="https://www.twitter.com/shopease" target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon={faTwitter} className="fa-icon" /> Twitter
            </a></p>
          </div>
        </div>
        <div id="contact-section" className="footer-section contact">
          <h2>Contato</h2>
          <p>Email: contato@shopease.com</p>
          <p>Telefone: (79) 1234-5678</p>
        </div>
      </div>
      <div className="footer-bottom">
        <p>© 2024 ShopEase. Todos os direitos reservados.</p>
      </div>
    </footer>
  );
};

export default Footer;
