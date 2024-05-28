import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import Home from './routes/Home.jsx';
import { createBrowserRouter, RouterProvider, Route } from 'react-router-dom';
import Products from './routes/Products.jsx';
import Category from './routes/Category.jsx';
import CategoryClients from './routes/CategoryClients.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home/>  
  },
  {
    path: "app",  
    element: <App/> 
  },
  {
    path: "produtos",
    element: <Products/>
  },
  {
    path: "categoriasserviços",
    element: <Category/>
  },
  {
    path: "categorias",
    element: <CategoryClients/>
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>
);
