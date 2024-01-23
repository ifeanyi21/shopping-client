import React from "react";
import Slider from "react-slick";
import Product from "../home/Product";
import { FaChevronCircleLeft, FaChevronCircleRight } from "react-icons/fa";

function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block" }}
      onClick={onClick}
    >
      <FaChevronCircleRight />
    </div>
  );
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block" }}
      onClick={onClick}
    >
      <FaChevronCircleLeft />
    </div>
  );
}

const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 5,
  slidesToScroll: 3,
  nextArrow: <SampleNextArrow />,
  prevArrow: <SamplePrevArrow />,
  responsive: [
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
        initialSlide: 2,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
  ],
};

const ProductSlider = ({ products }) => {
  return (
    <div>
      <Slider {...settings}>
        {products.map((product) => {
          return (
            <div className="p-2" key={product._id}>
              <Product
                image={product.Image}
                productId={product._id}
                name={product.name}
                price={product.price}
                salePrice={product.salePrice}
                salePercent={product.salePercent}
                quantity={product.quantity}
              />
            </div>
          );
        })}
      </Slider>
    </div>
  );
};

export default ProductSlider;
