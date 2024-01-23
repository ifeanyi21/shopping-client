import React from "react";
import { Link } from "react-router-dom";

const Product = ({name,productId,price,salePrice,salePercent,image,quantity}) => {
  return (
    <Link to={`/product/${name}/${productId}`} className="no-underline text-black">
      <div className="text-left relative">
        <img
          src={image[0]}
          className="w-full object-cover object-top"
          style={{ height: 300 }}
          alt=""
        />
        <div className={`mt-2 ${quantity===0 ? 'text-gray-400' : ""}`}>
          <h4 className="font-bold text-base mb-1 uppercase">{name}</h4>
           <div className="text-sm">
            {salePrice ? (
              <div className="relative">
                <span className="block font-semibold text-base">
                  ₦ {salePrice.toLocaleString()}
                </span>

                <span className="text-sm line-through text-muted">
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
        {quantity === 0 &&<div className="text-red-600 font-bold text-lg absolute top-3 right-3"> Sold out</div>}
      </div>
    </Link>
  );
};

export default Product;
