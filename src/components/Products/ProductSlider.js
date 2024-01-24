import React from "react";
import Slider from "react-slick";
import Product from "../home/Product";

const settings = {
  infinite: true,
  slidesToShow: 4,
  slidesToScroll: 2,
  autoplay: true,
  speed: 9000,
  autoplaySpeed: 1000,
  cssEase: "linear",
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
