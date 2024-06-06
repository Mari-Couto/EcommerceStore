import CategoryHome from '../components/CategoryHome'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import OneProductsCategory from '../components/OneProductCategory'; 

const CategoryClients = () => {
  const { IdCategoria } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/categoria/${IdCategoria}/produtos`);
        setProducts(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Erro ao buscar produtos da categoria:", error);
        setLoading(false);
      }
    };

    fetchProducts();
  }, [IdCategoria]);

  return (
    <div>
      
      <Navbar/>
      <h2>Produtos da Categoria {IdCategoria}</h2>
      {loading ? (
        <p>Carregando...</p>
      ) : (
        <OneProductsCategory products={products} />
      )}
            <Footer/>
    </div>
  );
};

export default CategoryClients;

