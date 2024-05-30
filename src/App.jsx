// App.jsx

import { Routes, Route } from "react-router-dom"
import ItemDetailContainer from './ItemDetailContainer';
import NavBar from './NavBar';
import BannerInfo from './BannerInfo';
import 'bootstrap/dist/css/bootstrap.min.css';
import CardWidget from './Carrito';
import NotFound from './NotFound';
import Home from './Home';
import ItemDetail from "./ItemDetail";
import Footer from "./Footer";
import CategoryDetailContainer from "./CategoryDetailContainer";
import Checkout from "./Checkout";
import CartProvider from "./Context/CartContext";
import Cart from "./Cart";


const App = () => {
  return (
    <>
      <CartProvider>

        <NavBar />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/Productos" element={<ItemDetailContainer />} />
          <Route exact path="/Productos/:id" element={<ItemDetail />} />
          <Route exact path="/Categoria/:idCategoria" element={<CategoryDetailContainer />} />
          <Route exact path="/Carrito" element={<Cart />} />
          <Route exact path="/Checkout" element={<Checkout />} />
          <Route path="*" element={<NotFound />} />
        </Routes>

        <Footer />

      </CartProvider>

    </>
  );
};

export default App;
