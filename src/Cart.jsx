// Cart.jsx
import { useContext } from "react";
import { CartContext } from "./Context/CartContext";
import { Link } from "react-router-dom";

const Cart = () => {

    const {cart, addToCart, removeFromCart, clearCart, obtenerTotal} = useContext(CartContext);


      if (obtenerTotal() == 0) {
        return (
            <div className="container my-5">
                <div className="row">
                    <div className="col text-center">
                        <div className="alert alert-danger" role="alert"><h4>No se encontraron Productos en el Carrito!</h4></div>
                        <Link to={"/"} className="btn bg-secondary my-5">Volver a la Página Principal</Link>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="container my-5">
            <div className="row">
                <div className="col">
                    <table className="table">
                        <tbody>
                            <tr>
                                <td colSpan={6} className="align-middle text-end"><button className="btn bg-secondary" onClick={clearCart}>Vaciar Carrito</button></td>
                            </tr>
                            {cart.map(item => (
                                <tr key={item.id}>
                                    <td><img src={item.imageUrl} alt={item.nombre} width={100} /></td>
                                    <td className="align-middle text-start fs-5">{item.nombre}</td>
                                    <td className="align-middle text-center fs-5">${item.precio}</td>
                                    <td className="align-middle text-center"><b>x{item.quantity}</b></td>
                                    <td className="align-middle text-center fs-5">${item.quantity * item.precio}</td>
                                    <td className="align-middle text-end"><svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" class="bi bi-trash3 me-5" viewBox="0 0 16 16">
  <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5" onClick={() => {removeFromCart(item.id)}} title="Eliminar Producto"/></svg></td>
                                </tr>    
                            ))}
                            <tr>
                                <td colSpan={4} className="align-middle text-center fs-4"><b>Total</b></td>
                                <td className="align-middle text-center fs-4"><b>${obtenerTotal()}</b></td>
                                <td className="align-middle text-end"><Link to={"/checkout"} className="btn bg-secondary">Checkout</Link></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default Cart;