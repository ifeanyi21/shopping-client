import { CardMedia } from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ProgressUpdate } from "../../components/Table/Table";
import CSSProduct from "../../assests/styles/product.module.css";
import CSS from "../../assests/styles/Style.module.css";

function WishlistInCart() {
  const [loading, setLoading] = useState(true);
  const [wishlist, setWishlist] = useState([]);

  const fetchProducts = useCallback(async () => {
    const response = await fetch(`${process.env.REACT_APP_API_URL}wishlist`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        token: localStorage.getItem("token"),
      },
    });

    const data = await response.json();
    setWishlist(data.wishlist);
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);
  return (
    <>
      {wishlist.length > 0 && (
        <div className="bg-white p-3" style={{ marginTop: "2rem" }}>
          <header className="flex justify-between mb-8">
            <p className="font-normal text-2xl">Wishlist</p>
            <Link
              to={"/account/wishlist"}
              className="no-underline text-orange-400 uppercase text-base rounded-xl p-2"
            >
              View all
            </Link>
          </header>

          {loading ? (
            <ProgressUpdate />
          ) : (
            <ul
              className="row"
              style={{
                overflowX: "auto",
                overflowY: "hidden",
                flexWrap: "nowrap",
                padding: 0,
              }}
            >
              {wishlist.map((item) => {
                return (
                  <div
                    key={item._id}
                    className={`text-center m-2 rounded ${CSSProduct.wishlistProduct} ${CSS.hoverItem}`}
                  >
                    <Link to={`/product/${item.name}/${item.productId}`}>
                      <CardMedia
                        sx={{ width: 200, }}
                        component="img"
                        alt={item.name}
                        height="200"
                        image={item.image}
                      />
                    </Link>
                    <div className={`p-3`}>
                      <p className="capitalize mb-2">{item.name}</p>
                      <div className={`text-sm mb-8`}>
                        {item.salePrice ? (
                          <div className="relative">
                            <span className="font-semibold block text-base">
                              ₦ {item.salePrice.toLocaleString()}
                            </span>

                            <span className="text-sm line-through">
                              ₦ {item.price.toLocaleString()}
                            </span>
                          </div>
                        ) : (
                          <div className="capitalize font-semibold text-base">
                            ₦ {item.price.toLocaleString()}
                          </div>
                        )}
                      </div>
                      <div className="flex justify-between"></div>
                    </div>
                  </div>
                );
              })}
            </ul>
          )}
        </div>
      )}
    </>
  );
}

export default WishlistInCart;
