import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Badge } from "react-bootstrap";
import { Button } from "@mui/material";
import { FaMinus, FaPlus } from "react-icons/fa";
import { ProgressUpdate } from "../../components/Table/Table";
import { useCallback } from "react";
import DeleteCartItem from "../../components/Cart Actions/DeleteCartItem";
import Rerender from "../../services/context/rerender";
import { ACTION_TYPES } from "../../services/actions/actions";

function CartItem(props) {
  const { productId, id, quantity, mountAgain,size } = props;
  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState({});
  const [, dispatch] = useContext(Rerender);

  const fetchProducts = useCallback(async () => {
    const response = await fetch(`${process.env.REACT_APP_API_URL}products`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();
    setLoading(false);
    const foundItem = data.data.find((product) => {
      return product._id === productId;
    });
    setProduct(foundItem);
  }, [productId]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const handleDecrement = async () => {
    dispatch({ type: ACTION_TYPES.RERENDER_START });
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}cartitem/decrease/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          token: localStorage.getItem("token"),
        },
      }
    );
    const data = await response.json();
    if (data.done) {
      mountAgain("update");
    } else {
      mountAgain("error");
    }
  };
  
  const handleIncrement = async () => {
    dispatch({ type: ACTION_TYPES.RERENDER_START });
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}cartitem/increase/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          token: localStorage.getItem("token"),
        },
      }
    );
    const data = await response.json();
    if (data.done) {
      mountAgain("update");
    } else {
      mountAgain("error");
    }
  };

  return (
    <div className="shadow-sm">
      {loading ? (
        <div className="mt-8 mb-16">
          <ProgressUpdate />
        </div>
      ) : (
        <div className={`row mb-8 px-3 py-4`}>
          <div className="col-lg-2 col-md-2 col-sm-6 col-xs-6 mb-4">
            <Link to={`/product/${product.name}/${productId}`}>
              <img className="w-full" src={product.Image[0]} alt="name" />
            </Link>
          </div>
          <div className="col-lg-10 col-md-10 col-sm-6 col-xs-6">
            <div className="row">
              <div className="col-lg-8 col-md-12 mb-3">
                <Link
                  className={`no-underline text-black capitalize text-xl font-semibold`}
                  to={`/product/${product.name}/${productId}`}
                >
                  {product.name}
                </Link>
                <div className="my-2">
                  <p className="m-0 capitalize">
                    Size: UK <span className="font-semibold">{size}</span>
                  </p>
                </div>
                {product.salePrice ? (
                  <div className="relative">
                    <div className="m-0">
                      <p className="m-0 font-semibold">
                        {" "}
                        ₦ {product.salePrice.toLocaleString()}
                      </p>
                    </div>

                    <div className="mt-2 line-through">
                      <p className="m-0 text-sm">
                        {" "}
                        ₦ {product.price.toLocaleString() || ""}
                      </p>
                    </div>

                    <p className="absolute top-0 left-3/4">
                      <Badge bg="success" pill>
                        {" "}
                        -{product.salePercent}%
                      </Badge>
                    </p>
                  </div>
                ) : (
                  <div className="mt-0">
                    <p className="m-0 font-semibold">
                      ₦ {product.price.toLocaleString() || ""}
                    </p>
                  </div>
                )}
              </div>
              <div className="col-lg-4 col-md-12">
                <div className="d-flex items-center justify-between">
                  <Button
                    variant="contained"
                    color="error"
                    disabled={quantity === 1 && true}
                    onClick={handleDecrement}
                  >
                    <FaMinus />
                  </Button>

                  <span className="mx-4 text-center">{quantity}</span>

                  <Button
                    variant="contained"
                    color="success"
                    onClick={handleIncrement}
                  >
                    <FaPlus />
                  </Button>
                </div>
                <div className="mt-12">
                  <DeleteCartItem productId={id} mountAgain={mountAgain} />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default CartItem;
