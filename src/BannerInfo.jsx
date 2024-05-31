// BannerInfo.jsx
import './EstiloNavBar.css';
import transporte from "../public/Logos/transporte.png";
import porcentaje from "../public/Logos/porcentaje.png";
import tarjeta from "../public/Logos/tarjeta-de-credito.png";

const BannerInfo = () => {
    return (
        <>
            <div className="logos-container text-center mb-4 mt-2">
                <div className="logo-item">
                    <img src={porcentaje} alt="Logo 1" />
                    <p><b>10% de descuento</b> Por transferencia bancaria</p>
                </div>
                <div className="logo-item">
                    <img src={tarjeta} alt="Logo 2" />
                    <p><b>Todos los medios de pago</b></p>
                </div>
                <div className="logo-item">
                    <img src={transporte} alt="Logo 3" />
                    <p><b>Envíos a todo el país</b> Gratis a partir de $90.000</p>
                </div>
            </div>
        </>
    );
}

export default BannerInfo;
