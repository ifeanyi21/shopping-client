import { Divider } from "@mui/material";
import React, { useCallback } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import AddToCart from "../../components/Add To Cart/AddToCart";
import AlertNotification from "../../components/Alert/Alert";
import ImageSlider from "../../components/Image Slider/ImageSlider";
import Recommendations from "../../components/Recomendation/Recomendation";
import { ProgressUpdate } from "../../components/Table/Table";
import Title from "../../components/Title/Title";
import ProductRatings from "./ProductRatings";

function ViewProduct() {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [showProduct, setShowProduct] = useState({});
  const [wishlist, setWishlist] = useState(false);
  const [notificationText, setNotificationText] = useState("");
  const [loadingAlert, setLoadingAlert] = useState(false);
  const [rerender, setRerender] = useState(false);
  const [category, setCategory] = useState(0);
  const navigate = useNavigate();

  const fetchProducts = useCallback(async () => {
    const response = await fetch(`${process.env.REACT_APP_API_URL}products`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();

    const foundProduct = data.data.filter((product) => {
      return product._id === id;
    });
    if (foundProduct.length === 1) {
      setShowProduct(foundProduct[0]);
      setCategory(foundProduct[0].Category);
      setLoading(false);
    } else {
      navigate("/");
    }
  }, [id, navigate]);

  const wishlistProduct = useCallback(async () => {
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}wishlist/${id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          token: localStorage.getItem("token"),
        },
      }
    );

    const data = await response.json();
    setWishlist(data.done);
  }, [id]);

  const mountAgain = (text) => {
    if (text === "add") {
      setNotificationText("Item Added to wishlist.");
    }

    setLoadingAlert(true);
    setRerender(!rerender);
    setTimeout(() => setLoadingAlert(false), 4000);
  };

  useEffect(() => {
    fetchProducts();
    wishlistProduct();
  }, [fetchProducts, wishlistProduct, rerender]);

  return (
    <div className="mt-8">
      <AlertNotification
        severity="success"
        message={notificationText}
        show={loadingAlert}
      />
      {loading ? (
        <div className="min-h-screen">
          <ProgressUpdate />
        </div>
      ) : (
        <>
          <Title
            text={showProduct.name}
            content={`${showProduct.description}. Shop more with Gadget Spot`}
          />
          <div className="row">
            <div className="col-lg-7 mb-16">
              <ImageSlider Images={showProduct.Image} name={showProduct.name} />
            </div>
            <div className="col-lg-5 mb-16">
              <h4 className="mb-2 text-2xl uppercase">{showProduct.name}</h4>
              <Divider />
              {/* <span>
                Brand:
                <Link
                  to={`/brand/${showProduct.Brand}`}
                  className="no-underline ml-1"
                >
                  {showProduct.Brand}
                </Link>
              </span> */}
              {showProduct.salePrice ? (
                <div className="relative mt-2">
                  <span className="block text-3xl font-semibold mb-1">
                    ₦ {showProduct.salePrice.toLocaleString()}
                  </span>

                  <span className="text-sm line-through">
                    ₦ {showProduct.price.toLocaleString()}
                  </span>

                  <span className="bg-green-700 p-2 rounded-full text-white absolute right-1 bottom-full text-xs">
                    {" "}
                    -{showProduct.salePercent}%
                  </span>
                </div>
              ) : (
                <div className="capitalize font-semibold text-3xl my-4">
                  ₦ {showProduct.price.toLocaleString()}
                </div>
              )}
              <Divider />
              <p className="my-8">
                {showProduct.description.substring(0, 200)}...{" "}
                <a href="#description">Read More</a>
              </p>
              {showProduct.quantity === 0 && (
                <div className="text-red-600 font-medium text-lg">
                  This item is currently sold out
                </div>
              )}
              <AddToCart
                wishlist={wishlist}
                mountAgain={mountAgain}
                productQuantity={showProduct.quantity}
              />
            </div>
            <div className="my-8" style={{ marginTop: 32 }} id="description">
              <div className="col-lg-12">
                <h3 className="my-8 capitalize">{showProduct.name}</h3>
                <h6 className="mb-4 font-semibold">Description</h6>
                <p className="font-normal">{showProduct.description}</p>
              </div>
              <div
                style={{
                  borderBottom: "10px solid aqua",
                  height: "20px",
                  width: "25%",
                }}
              ></div>
            </div>
          </div>
          <Recommendations cat={category} />
          <ProductRatings />
        </>
      )}
    </div>
  );
}

export default ViewProduct;
