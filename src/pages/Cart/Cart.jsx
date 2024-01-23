import { Backdrop, CircularProgress } from "@mui/material";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AlertNotification from "../../components/Alert/Alert";
import Empty from "../../components/Empty/Empty";
import ProductSection from "../../components/Products/Section";
import { ProgressUpdate } from "../../components/Table/Table";
import Title from "../../components/Title/Title";
import { ACTION_TYPES } from "../../services/actions/actions";
import Rerender from "../../services/context/rerender";
import Auth from "../../services/context/store";
import CartItem from "./Cartitem";
import CartSummary from "./CartSummary";
import WishlistInCart from "./WishlistInCart";

function CartPage() {
  const [cart, setCart] = useState([]);
  const [state] = useContext(Auth);
  const [rerenderPage, dispatch] = useContext(Rerender);
  const [loading, setLoading] = useState(true);
  const [notificationText, setNotificationText] = useState("");
  const [notificationType, setNotificationType] = useState("");
  const [loadingAlert, setLoadingAlert] = useState(false);
  const [rerender, setRerender] = useState(false);
  const token = localStorage.getItem("token");
  const [summary, setSummary] = useState(0);
  const navigate = useNavigate();

  const mountAgain = (text) => {
    if (text === "update") {
      setNotificationType("success");
      setNotificationText("Item updated.");
    }

    if (text === "delete") {
      setNotificationType("success");
      setNotificationText("Item removed.");
    }

    if (text === "error") {
      setNotificationText("Oops, an error occurred");
      setNotificationType("error");
    }

    setLoadingAlert(true);
    setRerender(!rerender);
    setTimeout(() => {
      setLoadingAlert(false);
      dispatch({ type: ACTION_TYPES.RERENDER_STOP });
    }, 3800);
  };

  const fetchProducts = useCallback(async () => {
    const response = await fetch(`${process.env.REACT_APP_API_URL}cart/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        token,
      },
    });

    const data = await response.json();
    setCart(data.cart);
    setSummary(data.subtotal);
    setLoading(false);
  }, [token]);

  useEffect(() => {
    if (state.loggedIn) {
      fetchProducts();
    }
  }, [fetchProducts, rerender, state.loggedIn, navigate, dispatch]);

  return (
    <div>
      <Title
        text={"Cart"}
        content={`Get all the latest gadgets here at Gadget Spot. Shop more with Gadget Spot`}
      />
      <h6 className="text-center font-semibold text-xl">Your Shopping Cart</h6>
      <AlertNotification
        severity={notificationType}
        message={notificationText}
        show={loadingAlert}
      />
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={rerenderPage}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      {state.loggedIn ? (
        loading ? (
          <div className="min-h-screen mt-16">
            <ProgressUpdate />
          </div>
        ) : (
          <div className="mb-8 container">
            <div className="row">
              {cart.length > 0 ? (
                <>
                  <div className="col-lg-9 col-md-12 mb-4 p-4">
                    {cart.map((cartItem) => {
                      return (
                        <div key={cartItem._id} className="bg-white">
                          <CartItem
                            size={cartItem.size}
                            id={cartItem._id}
                            productId={cartItem.productId}
                            quantity={cartItem.quantity}
                            mountAgain={mountAgain}
                          />
                        </div>
                      );
                    })}
                  </div>
                  <div className="col-lg-3 col-md-12 mb-4 p-4">
                    <CartSummary summary={summary} />
                  </div>
                </>
              ) : (
                <div className="bg-white p-8">
                  <Empty text={"Your shopping cart is empty"} />
                </div>
              )}
              <WishlistInCart />
            </div>
          </div>
        )
      ) : (
        <div className="bg-white text-lg text-center p-8">
          You're not logged.{" "}
          <Link to={"/login?/cart"} className="no-underline font-bold">
            Login
          </Link>{" "}
          to view your cart
        </div>
      )}

      <ProductSection title={"Top Selling"} url={"products"} />
    </div>
  );
}

export default CartPage;
