import React from "react";
import Products from "./Products";

function ProductSection({ title, url }) {
  return (
    <div className="bg-white p-3">
      <p className="mb-8 font-normal text-2xl">{title}</p>
      <Products url={url} />
    </div>
  );
}

export default ProductSection;
