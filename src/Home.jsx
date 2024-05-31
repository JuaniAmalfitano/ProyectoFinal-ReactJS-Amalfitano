// Home.jsx
import BannerInfo from "./BannerInfo";
import ItemDetailContainer from "./ItemDetailContainer";

import carrusel from "../public/carrusel-main.png";

const Home = () => {

    return (
        <div className='colorBody'>
        <div className='mb-3'>
          <img className='img-fluid' src={carrusel} alt="" />
        </div>
        <BannerInfo />
        <ItemDetailContainer />
      </div>
    )
}

export default Home;