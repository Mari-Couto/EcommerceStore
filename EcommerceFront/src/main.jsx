import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import Home from './routes/Home.jsx';
import { createBrowserRouter, RouterProvider, Route } from 'react-router-dom';
import Products from './routes/Products.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home/>  // Defina a página Home como a rota inicial
  },
  {
    path: "app",  // Alterado de "inicio" para "app"
    element: <App/>  // Aqui você pode colocar a lógica para verificar se o usuário está logado antes de renderizar o componente App
  },
  {
    path: "produtos",
    element: <Products/>
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>
);
