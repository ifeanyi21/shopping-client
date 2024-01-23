import Carousel from "react-bootstrap/Carousel";
import { Link } from "react-router-dom";
import Banner1 from "../../assests/images/banner1.jpg";
import Banner2 from "../../assests/images/banner2.jpeg";
import Banner5 from "../../assests/images/banner5.webp";

function CarouselSlider() {
  return (
    <Carousel>
      <Carousel.Item>
        <Link to="/brand/Samsung">
          <img
            src={Banner1}
            alt="Samsung Banner"
            className="d-block w-100 h-96 object-cover rounded-3xl"
          />
        </Link>
      </Carousel.Item>
      <Carousel.Item>
        <Link to="/brand/Apple">
          <img
            className="d-block w-100 h-96 object-cover rounded-3xl"
            src={Banner2}
            alt="Apple Banner"
          />
        </Link>
      </Carousel.Item>
      <Carousel.Item>
        <Link to="/brand/Playstation">
          <img
            className="d-block w-100 h-96 object-cover rounded-3xl"
            src={Banner5}
            alt="Playstation Banner"
          />
        </Link>
      </Carousel.Item>
    </Carousel>
  );
}

export default CarouselSlider;
