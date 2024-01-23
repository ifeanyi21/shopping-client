import { Button, CircularProgress } from "@mui/material";
import React, { useContext, useState } from "react";
import { Form } from "react-bootstrap";
import { FaCartPlus, FaMinus, FaPlus } from "react-icons/fa";
import { useParams, useNavigate } from "react-router-dom";
import { ACTION_TYPES } from "../../services/actions/actions";
import Cart from "../../services/context/cart";
import Auth from "../../services/context/store";
import AddToWishlistButton from "../Add To Wishlist/AddToWishlistButton";
import AlertNotification from "../Alert/Alert";

function AddToCart({ wishlist, mountAgain, productQuantity }) {
  const navigate = useNavigate();
  const [, dispatch] = useContext(Cart);
  const [state] = useContext(Auth);
  const { id, name } = useParams();
  const token = localStorage.getItem("token");
  const [quantity, setQuantity] = useState(1);
  const [size, setSize] = useState(0);
  const [notificationText, setNotificationText] = useState("");
  const [notification, setNotification] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const fetchProducts = async () => {
    if (size === 0) {
      setError(true);
      setNotificationText("Select a size");
    } else {
      setLoading(true);
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}addcart/${id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            token,
          },
          body: JSON.stringify({ quantity, size }),
        }
      );

      const data = await response.json();
      if (data.done) {
        setError(false);
        setNotification(true);
        setNotificationText(data.message);
        dispatch({ type: ACTION_TYPES.ADD_TO_CART });
        setTimeout(() => setNotification(false), 4000);
      } else {
        setNotification(false);
        setError(true);
        setNotificationText(data.message);
        window.location.reload();
      }
      setLoading(false);
    }
  };

  const handleSize = (e) => {
    setSize(parseInt(e.target.value));
  };

  const handleDecrement = (e) => {
    setQuantity((prev) => prev - 1);
  };

  const handleIncrement = () => {
    setQuantity((prev) => prev + 1);
  };

  const handleAddToCart = () => {
    if (state.loggedIn) {
      fetchProducts();
    } else {
      navigate(`/login?/product/${name}/${id}`);
    }
  };

  return (
    <div className="mt-8">
      <AlertNotification
        severity="success"
        message={notificationText}
        show={notification}
      />
      <AlertNotification
        severity="error"
        message={notificationText}
        show={error}
      />
      {/* <p className="mb-4">Quantity</p> */}
      <div
        className={`${productQuantity === 0 ? "hidden" : "flex items-center"}`}
      >
        <Button
          variant="contained"
          color="error"
          size="large"
          disabled={quantity === 1 && true}
          onClick={handleDecrement}
        >
          <FaMinus />
        </Button>
        <p className="mb-0 mx-4">{quantity}</p>
        <Button
          variant="contained"
          color="success"
          size="large"
          onClick={handleIncrement}
        >
          <FaPlus />
        </Button>
      </div>
      <div
        className={`${
          productQuantity === 0 ? "hidden" : "flex items-baseline mt-8"
        }`}
      >
        {/* <span className="font-normal text-xl mr-4">Size:</span> */}
        <Form.Select
          required
          onChange={handleSize}
          size="md"
          style={{ width: "80%", backgroundColor: "transparent" }}
        >
          <option value={0}>Choose a size</option>
          <option value={8}>Uk 8</option>
          <option value={10}>Uk 10</option>
          <option value={12}>Uk 12</option>
          <option value={14}>Uk 14</option>
          <option value={16}>Uk 16</option>
          <option value={18}>Uk 18</option>
          <option value={20}>Uk 20</option>
          <option value={22}>Uk 22</option>
        </Form.Select>
      </div>
      {productQuantity === 0 ? (
        <AddToWishlistButton wishlist={wishlist} mountAgain={mountAgain} />
      ) : (
        <div className="mt-8 flex justify-between">
          {loading ? (
            <Button sx={{ width: "80%" }}>
              <CircularProgress
                sx={{ height: "25px !important", width: "25px !important" }}
                color="primary"
              />
            </Button>
          ) : (
            <Button
              variant="outlined"
              sx={{ width: "80%" }}
              startIcon={<FaCartPlus />}
              onClick={handleAddToCart}
            >
              Add To Cart
            </Button>
          )}

          <AddToWishlistButton wishlist={wishlist} mountAgain={mountAgain} />
        </div>
      )}

      <div className="mt-8"></div>
    </div>
  );
}

export default AddToCart;
