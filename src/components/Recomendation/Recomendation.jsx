import React from "react";
import ProductSection from "../Products/Section";

function Recommendations({ cat }) {
  return (
    <div className="my-8">
      <h3 className="text-center mb-8">You may also like</h3>
      <ProductSection title={""} url={`products/${cat}`} />
    </div>
  );
}

export default Recommendations;
