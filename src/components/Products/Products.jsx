import React, { useCallback, useEffect, useState } from "react";

import CSSProduct from "../../assests/styles/product.module.css";
import Product from "../home/Product";
import { ProgressUpdate } from "../Table/Table";

function Products({ url }) {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);

  const fetchProducts = useCallback(async () => {
    const response = await fetch(`${process.env.REACT_APP_API_URL}${url}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();
    setLoading(false);
    setProducts(data.data);
  }, [url]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return (
    <div>
      {loading ? (
        <ProgressUpdate />
      ) : (
        <ul
          className="row"
          style={{ overflowX: "auto", flexWrap: "nowrap", padding: 0 }}
        >
          {products.map((product) => (
            <div
              key={product._id}
              className={`text-center m-1 ${CSSProduct.productCard}`}
              style={{ width: "22%" }}
            >
              <Product
                image={product.Image}
                productId={product._id}
                name={product.name}
                price={product.price}
                salePrice={product.salePrice}
                salePercent={product.salePercent}
              />
            </div>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Products;
