// Menu.jsx
import './EstiloNavBar.css';
import React, { useState } from 'react';
import CardWidget from './Carrito';
import { Link } from 'react-router-dom';

const NavBar = () => {


  return (
    <header className="header d-flex flex-wrap justify-content-center py-3 mb-4 border-bottom">
      <a className="logo" href="/"><h1 className=''>Juani Designs</h1></a>
      <div className="header-centro">
        <nav>
          <ul className="NavBar">
            <li><Link to="/">Inicio</Link></li>
          <li><Link to="/productos">Productos</Link></li>
          <li><Link to="/categoria/Lamparas">Lamparas</Link></li>
          <li><Link to="/categoria/Parrillas">Parrillas</Link></li>
          <li><Link to="/categoria/Escudos">Escudos</Link></li>
          </ul>
        </nav>
      </div>
      <div className="header-derecho">
        <CardWidget />
      </div>
    </header>
  );
}

export default NavBar;


