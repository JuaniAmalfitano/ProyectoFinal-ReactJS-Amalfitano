//ItemDetail.jsx

import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import './EstiloNavBar.css';
import ItemCount from './ItemCount';
import { db } from './firebaseConfig';
import { doc, getDoc } from 'firebase/firestore';
import { CartContext } from "./Context/CartContext";
import { NavLink } from 'react-router-dom';

const ItemDetail = () => {
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useContext(CartContext);
  

  useEffect(() => {
    const fetchItem = async () => {
      setLoading(true);
      try {
        const docRef = doc(db, 'productos', id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setItem({ id: docSnap.id, ...docSnap.data() });
        } else {
          setItem(null);
        }
      } catch (error) {
        console.error("Error fetching item: ", error);
        setItem(null);
      }
      setLoading(false);
    };

    fetchItem();
  }, [id]);

  const handleAddToCart = (quantity) => {
    console.log(`Agregado al carrito: ${item.nombre}, Cantidsaad: ${quantity}`);
    addToCart(item, quantity);
  };

  if (loading) {
    return (
      <div className="text-center">
        <div className="spinner-grow text-danger" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (!item) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: "red" }}>
        <img src="../public/navegador.png" alt="Descripción de la foto" height={300} style={{ marginBottom: '20px' }} />
        <div className="d-flex justify-content-center align-items-center text-center">
          <h2>Producto con el id: {id} no encontrado</h2>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="product-detail-container bg-secondary">
        <div className="product-image">
          <img className='img-fluid' src={item.imageUrl} alt={item.nombre} />
        </div>
        <div className="product-details">
          <div className='detalles-info'>
            <h6>Categoria: {item.categoria}</h6>
            <h2 className="product-name">{item.nombre}</h2>
            <p className="product-price">Precio: ${item.precio}</p>
            <p className="product-price-discount">Precio: ${item.precioTransferencia} - 10% de descuento pagando con Transferencia Bancaria/Efectivo</p>
            <p><b>Envío gratis</b> superando los <b>$90.000,00</b></p>
            <p>Stock Disponible!: <b>{item.stock}</b></p>
            <ItemCount stock={item.stock} item={item} onAdd={handleAddToCart} />

            <NavLink to="/Carrito" className="btn buy-button bg-primary">Comprar</NavLink>
            <div className="MediosDePago mt-3">
              <h5>Medios de pago</h5>
              <img src="../public/MediosDePago/mastercard@2x.png" alt="mastercard" />
              <img src="../public/MediosDePago/mercadopago@2x.png" alt="mercadoPago" />
              <img src="../public/MediosDePago/pagofacil@2x.png" alt="pagoFacil" />
              <img src="../public/MediosDePago/rapipago@2x.png" alt="rapiPago" />
              <img src="../public/MediosDePago/tarjeta-naranja@2x.png" alt="tarjeta naranja" />
              <img src="../public/MediosDePago/visa@2x.png" alt="visa" />
            </div>
            <img src="public\Logos\transporte.png" alt="" /><span className='ms-2'>Medios de envio</span>
            <div>
              <input className='inpBuscador' type="text" placeholder='Tu codigo postal' />
              <button className='ms-4 botonCalcular'>Calcular</button>
              <a href=""><p>No se mi codigo postal</p></a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ItemDetail;
