import React from "react";
import Slider from "react-slick";

function ImageSlider({ Images, name }) {
  const SlickArrowLeft = ({ currentSlide, slideCount, ...props }) => (
    <button
      {...props}
      className={
        "slick-prev slick-arrow"
        // (currentSlide === 0 ? " slick-disabled" : "")
      }
      aria-disabled={currentSlide === 0 ? true : false}
      type="button"
    >
      Previous
    </button>
  );
  const SlickArrowRight = ({ currentSlide, slideCount, ...props }) => (
    <button
      {...props}
      className={
        "slick-next slick-arrow"
        // (currentSlide === slideCount - 1 ? " slick-disabled" : "")
      }
      aria-disabled={currentSlide === slideCount - 1 ? true : false}
      type="button"
    >
      Next
    </button>
  );

  const settings = {
    className: "center",
    //centerMode: true,
    // centerPadding: "5px",
    swipeToSlide: true,
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <SlickArrowRight />,
    prevArrow: <SlickArrowLeft />,

    style: {
      textAlign: "-webkit-center",
      width: "95%",
      margin: "0px auto",
    },
  };

  return (
    <Slider {...settings}>
      {Images.map((image, index) => {
        return (
          <div key={index} style={{height:350}}>
            <img
              className="img-fluid"
              height={400}
              width={400}
              src={Images[index]}
              alt={name}
            />
          </div>
        );
      })}
    </Slider>
  );
}

export default ImageSlider;
