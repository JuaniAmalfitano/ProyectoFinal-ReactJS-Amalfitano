// Footer.jsx
import './EstiloNavBar.css';

const Footer = () => {

  return (
    <div className="container-fluid footer">
      <footer className="d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top">
        <p className="col-md-4 mb-0 text-body-secondary">&copy; 2024 Company, Inc</p>

        <a className="col-md-4 d-flex align-items-center justify-content-center logoFooter" href="/"><h1 className=''>Juani Designs</h1></a>

        <ul className="nav col-md-4 justify-content-end">
          <li className="nav-item"><a href="/" className="nav-link px-2 text-body-secondary fs-5">Inicio</a></li>
          <li className="nav-item"><a href="/productos" className="nav-link px-2 text-body-secondary fs-5">Productos</a></li>
          <li className="nav-item"><a href="/categoria/Lamparas" className="nav-link px-2 text-body-secondary fs-5">Lamparas</a></li>
          <li className="nav-item"><a href="/categoria/Parrillas" className="nav-link px-2 text-body-secondary fs-5">Parrillas</a></li>
          <li className="nav-item"><a href="/categoria/Escudos" className="nav-link px-2 text-body-secondary fs-5">Escudos</a></li>
        </ul>
      </footer>
    </div>
  )
}

export default Footer;




