// ItemCount.jsx
import React, { useState, useContext } from "react";
import { CartContext } from "./Context/CartContext";

const ItemCount = ({ stock, item }) => {
  const [contador, setContador] = useState(1);
  const [itemStock, setItemStock] = useState(stock);
  const { addToCart } = useContext(CartContext);

  const incrementar = () => {
    if (contador < itemStock) {
      setContador(contador + 1);
    }
  };

  const decrementar = () => {
    if (contador > 1) {
      setContador(contador - 1);
    }
  };

  const handleAddToCart = () => {
    if (contador <= itemStock) {
      addToCart(item, contador); // Agregar al carrito con cantidad
      setItemStock(itemStock - contador); // Actualizar el stock disponible
      setContador(1); // Reiniciar el contador
  
      console.log("Producto agregado al carrito:", item, "Cantidad:", contador);
    }
  };
  

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-4">
          <div className="btn-group" role="group">
            <button type="button" className="btn bg-secondary" onClick={decrementar}>
              -
            </button>
            <button type="button" className="btn bg-secondary">
              {contador}
            </button>
            <button type="button" className="btn bg-secondary" onClick={incrementar} disabled={contador >= itemStock}>
              +
            </button>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-md-4">
          {itemStock >= 1 ? (
            <button type="button" className="botonCalcular mt-2" onClick={handleAddToCart}>
              Agregar al Carrito
            </button>
          ) : (
            <button type="button" className="btn bg-light mt-2">
              <b>SIN STOCK</b>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ItemCount;
