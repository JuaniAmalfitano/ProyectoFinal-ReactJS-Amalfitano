// ItemDetailContainer.jsx
import React, { useState, useEffect } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import './EstiloNavBar.css';
import { db } from './firebaseConfig';
import { collection, getDocs, query, where, addDoc } from 'firebase/firestore';
import { mockItem } from './utils';

const ItemDetailContainer = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const { categoryId } = useParams();
  const [orden, setOrden] = useState('');

  useEffect(() => {
    const fetchItems = async () => {
      setLoading(true);
      try {
        const q = categoryId
          ? query(collection(db, 'productos'), where('categoria', '==', categoryId))
          : collection(db, 'productos');
        const querySnapshot = await getDocs(q);
        const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setItems(data);
      } catch (error) {
        console.error("Error fetching items: ", error);
      }
      setLoading(false);
    };

    fetchItems();
  }, [categoryId]);

  useEffect(() => {
    const checkAndUploadMockItems = async () => {
      try {
        const existingItemsSnapshot = await getDocs(collection(db, 'productos'));
        if (existingItemsSnapshot.empty) {
          const batch = mockItem.map(async (item) => {
            await addDoc(collection(db, 'productos'), item);
          });
          await Promise.all(batch);
          console.log("Todos los productos fueron subidos exitosamente!");
        } else {
          console.log("Los productos ya existen en la colección.");
        }
      } catch (error) {
        console.error("Error al verificar o subir los productos: ", error);
      }
    };

    checkAndUploadMockItems();
  }, []);

  const handleOrden = (event) => {
    setOrden(event.target.value);
  };

  const itemsOrdenador = [...items].sort((a, b) => {
    switch (orden) {
      case 'price-asc':
        return a.precio - b.precio;
      case 'price-desc':
        return b.precio - a.precio;
      case 'name-asc':
        return a.nombre.localeCompare(b.nombre);
      case 'name-desc':
        return b.nombre.localeCompare(a.nombre);
      default:
        return 0;
    }
  });

  return (
    <div className='container'>
      <div className='row'>
        <div className='col-12'>
          <div className="mb-3">
            <select className="form-select" value={orden} onChange={handleOrden}>
              <option value="">Ordenar por</option>
              <option value="price-asc">Precio: menor a mayor</option>
              <option value="price-desc">Precio: mayor a menor</option>
              <option value="name-asc">Nombre: A-Z</option>
              <option value="name-desc">Nombre: Z-A</option>
            </select>
          </div>
        </div>
      </div>
      <div className='row p-2 mx-auto'>
        {loading ? (
          <div className="text-center">
            <div className="spinner-grow text-danger" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : (
          itemsOrdenador.length > 0 ? (
            itemsOrdenador.map((item) => (
              <div className="container col-xl-3 col-md-4 col-sm-6 cardProducto pt-4 mb-4" key={item.id}>
                <img className="productosFoto img-fluid" src={item.imageUrl} alt={item.nombre} />
                <h2 className="nombreProducto mt-4">{item.nombre}</h2>
                <p className="precioProductos">Precio: ${item.precio}</p>
                <p className="">Precio: ${item.precioTransferencia} - 10% de descuento pagando con Transferencia Bancaria/Efectivo</p>
                {item.stock === 0 && (
                  <div className="alert alert-danger" role="alert">
                    Sin stock
                  </div>
                )}
                <NavLink to={`/productos/${item.id}`} className="mb-3 btn btn-primary">Ver detalle del producto</NavLink>
              </div>
            ))
          ) : (
            <div className="text-center">
              <p>No se encontraron productos</p>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default ItemDetailContainer;
