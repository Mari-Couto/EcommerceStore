import { useState } from 'react';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import ProductsHome from '../components/ProductsHome';
import OneProductHome from '../components/OneProductHome';

const Home = () => {
  const [showPostForm, setShowPostForm] = useState(false);
  const [products, setProducts] = useState([]);
  const [message, setMessage] = useState('');

  return (
    <div>
      <Navbar 
        setShowPostForm={setShowPostForm} 
        setProducts={setProducts} 
        setMessage={setMessage} 
      />
      {message && <div className="messageProduto">{message}</div>}
      {showPostForm ? (
        <OneProductHome products={products} onClose={() => setShowPostForm(false)} />
      ) : (
        <ProductsHome />
      )}
      <Footer />
    </div>
  );
};

export default Home;
