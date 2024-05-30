// Checkout.jsx
import React, { useState, useContext } from 'react';
import { CartContext } from './Context/CartContext';
import { db } from './firebaseConfig';
import { addDoc, collection, doc, updateDoc } from 'firebase/firestore';
import { Link } from 'react-router-dom';

const Checkout = () => {
  const { cart, clearCart } = useContext(CartContext); // Añadir clearCart
  const [orderId, setOrderId] = useState('');
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [telefono, setTelefono] = useState('');
  const [nombreError, setNombreError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [TelefonoError, setTelefonoError] = useState("");

  const obtenerTotal = () => {
    return cart.reduce((acumulador, item) => acumulador + (item.precio * item.quantity || 0), 0);
  };

  const generarOrden = async () => {
    if (nombre === "") {
      setNombreError("Debe completar el campo Nombre!");
      return false;
    } else {
      setNombreError("");
    }

    if (email === "") {
      setEmailError("Debe completar el campo Email!");
      return false;
    } else {
      setEmailError("");
    }

    if (telefono === "") {
      setTelefonoError("Debe completar el campo Telefono!");
      return false;
    } else {
      setTelefonoError("");
    }

    const fecha = new Date();
    const date = `${fecha.getDate()}-${fecha.getMonth() + 1}-${fecha.getFullYear()} ${fecha.getHours()}:${fecha.getMinutes()}:${fecha.getSeconds()}`;
    const buyer = { name: nombre, email: email, telephone: telefono };
    const itemsCart = cart.map(item => ({
      id: item.id,
      title: item.nombre,
      price: item.precio,
      quantity: item.quantity
    }));

    const order = { buyer: buyer, itemsCart: itemsCart, date: date, total: obtenerTotal() };

    try {
      const ordersCollection = collection(db, "orders");
      const docRef = await addDoc(ordersCollection, order);
      setOrderId(docRef.id);
      console.log("Orden realizada con ID: ", docRef.id);

      const buyersCollection = collection(db, "buyers");
      await addDoc(buyersCollection, buyer);
      console.log("Comprador Guardado");

      // Actualizar stock de productos
      for (const item of cart) {
        const productRef = doc(db, "productos", item.id);
        await updateDoc(productRef, {
          stock: item.stock - item.quantity
        });
      }

      clearCart(); // Vaciar el carrito después de generar la orden
    } catch (error) {
      console.error("Error al realizar la orden: ", error);
      alert("Hubo un error al realizar la orden. Por favor intenta nuevamente.");
    }
  };

  if (orderId) {
    return (
      <div className="container my-5">
        <div className="row">
          <div className="col text-center">
            <div className="alert alert-light" role="alert"><h4>Felicitaciones! Tu Orden de Compra es: <b>{orderId}</b></h4></div>
          </div>
          <div className='text-center'>
            <Link to={"/"} className="btn bg-info my-5">Volver a la Página Principal</Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <>
      <Link to="/Carrito">
        <div className='container'>
          <button className='btn btn-secondary'>Volver Al Carrito</button>
        </div>
      </Link>

      <div className="container my-5 border">
        <div className="row mt-3 mb-3">
          <div className="col-md-6">
            <h2 className='text-center'>Detalles de contacto</h2>
            <div className="mb-3">
              <label className="form-label">Nombre *</label>
              <input type="text" className={`form-control ${nombreError && "is-invalid"}`} onInput={(event) => { setNombre(event.target.value) }} />
              <div className="text-danger">{nombreError}</div>
            </div>
            <div className="mb-3">
              <label className="form-label">Email *</label>
              <input type="text" className={`form-control ${emailError && "is-invalid"}`} onInput={(event) => { setEmail(event.target.value) }} />
              <div className="text-danger">{emailError}</div>
            </div>
            <div className="mb-3">
              <label className="form-label">Telefono *</label>
              <input type="text" className={`form-control ${TelefonoError && "is-invalid"}`} onInput={(event) => { setTelefono(event.target.value) }} />
              <div className="text-danger">{TelefonoError}</div>
            </div>
            <div className='text-center'>
              <button className='btn btn-secondary' onClick={generarOrden}>Generar orden de compra</button>
            </div>
          </div>
          <div className="col-md-6">
            <h2 className='text-center'>Detalle de venta</h2>
            {cart.map(item => (
              <div key={item.id} className="d-flex align-items-center mb-3">
                <img src={item.imageUrl} alt={item.nombre} className="me-3" style={{ maxWidth: '100px' }} />
                <div>
                  <h5>{item.nombre}</h5>
                  <p>Precio: ${item.precio}</p>
                  <p>Cantidad: {item.quantity}</p>
                </div>
              </div>
            ))}
            <div>
              <h5 className='text-end'>Total: $ <b>{obtenerTotal()}</b></h5>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Checkout;
