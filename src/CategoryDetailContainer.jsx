// CategoryDetailContainer.jsx

import React, { useState, useEffect } from 'react';
import { useParams, NavLink } from 'react-router-dom';
import './EstiloNavBar.css';
import { db } from './firebaseConfig';
import { collection, getDocs, query, where } from 'firebase/firestore';

const CategoryDetailContainer = () => {
    const { idCategoria } = useParams();
    const [categoryItems, setCategoryItems] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCategoryItems = async () => {
            setLoading(true);
            try {
                const q = query(collection(db, 'productos'), where('categoria', '==', idCategoria));
                const querySnapshot = await getDocs(q);
                const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                setCategoryItems(data);
            } catch (error) {
                console.error("Error fetching category items: ", error);
                setCategoryItems([]);
            }
            setLoading(false);
        };

        fetchCategoryItems();
    }, [idCategoria]);

    return (
        <>
            <div className='row p-2 mx-auto container'>
                {loading ? (
                    <div className="text-center">
                        <div className="spinner-grow text-danger" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                    </div>
                ) : categoryItems.length > 0 ? (
                    categoryItems.map(item => (
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
                            <NavLink to={`/productos/${item.id}`} className="mb-5 btn btn-primary">Ver detalle del producto</NavLink>
                        </div>
                    ))
                ) : (
                    <p>No hay productos en esta categoría.</p>
                )}
            </div>
        </>
    );
};

export default CategoryDetailContainer;
