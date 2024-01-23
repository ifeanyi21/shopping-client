import React from "react";
import { Link } from "react-router-dom";
import Card from "react-bootstrap/Card";
import CSS from "../../assests/styles/Style.module.css";

function Product(props) {
  const { productId, name, price, salePrice, salePercent, image } = props;

  return (
    <Link
      to={`/product/${name}/${productId}`}
      className={`no-underline text-gray-700 hover:text-black`}
    >
      <Card
        className={`bg-transparent hover:shadow shadow-gray-500 border-0 px-3 py-2 mb-8 ${CSS.hoverItem}`}
      >
        <Card.Img
          src={image[0]}
          style={{ height: "200px", objectFit: "contain", width: "100%" }}
        />
        <div className="text-left capitalize">
          <p className="m-0 font-normal text-lg mb-2">{name}</p>
          <div className="text-sm">
            {salePrice ? (
              <div className="relative">
                <span className="block font-semibold text-base">
                  ₦ {salePrice.toLocaleString()}
                </span>

                <span className="text-sm line-through">
                  ₦ {price.toLocaleString()}
                </span>

                <span className="bg-green-700 p-2 rounded-full text-white absolute right-1 bottom-full text-xs">
                  {" "}
                  -{salePercent}%
                </span>
              </div>
            ) : (
              <div className="capitalize font-semibold text-base">
                ₦ {price.toLocaleString()}
              </div>
            )}
          </div>
        </div>
      </Card>
    </Link>
  );
}

export default Product;
