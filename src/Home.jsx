// Home.jsx
import BannerInfo from "./BannerInfo";
import ItemDetailContainer from "./ItemDetailContainer";

const Home = () => {

    return (
        <div className='colorBody'>
        <div className='mb-3'>
          <img className='img-fluid' src="public\carrusel-main.jpg" alt="" />
        </div>
        <BannerInfo />
        <ItemDetailContainer />
      </div>
    )
}

export default Home;