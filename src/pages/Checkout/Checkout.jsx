import { Button, Card, Divider } from "@mui/material";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { FaChevronLeft } from "react-icons/fa";
import AddAddressForm from "../../components/Add Address/AddAddressForm";
import AddAddressModal from "../../components/Add Address/AddAddressModal";
import ShowAddress from "../../components/Show Address/ShowAddress";
import Title from "../../components/Title/Title";
import Rerender from "../../services/context/rerender";
import { ACTION_TYPES } from "../../services/actions/actions";
import Paystack from "../../assests/images/paystack.svg";
import { useNavigate } from "react-router-dom";
import { ProgressUpdate } from "../../components/Table/Table";
import CheckoutButton from "../../components/Checkout Button/CheckoutButton";
import Auth from "../../services/context/store";

function Checkout() {
  const token = localStorage.getItem("token");
  const [authState] = useContext(Auth);
  const [addresses, setAddresses] = useState([]);
  const [cart, setCart] = useState([]);
  const [defaultAddress, setDefaultAddress] = useState([]);
  const [state, dispatch] = useContext(Rerender);
  const [total, setTotal] = useState(0);
  const [deliveryFee, setDeliveryFee] = useState(0);
  const [subtotal, setSubtotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchProducts = useCallback(async () => {
    const response = await fetch(`${process.env.REACT_APP_API_URL}cart/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        token,
      },
    });

    const data = await response.json();
    if (data.cart.length > 0) {
      setCart(data.cart);
      setSubtotal(data.subtotal);
      setDeliveryFee(data.total - data.subtotal);
      setTotal(data.total);
      dispatch({ type: ACTION_TYPES.RERENDER_STOP });
      setLoading(false);
    } else {
      navigate("/cart");
    }
  }, [token, dispatch, navigate]);

  const getDetails = useCallback(async () => {
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}customerDetails`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          token,
        },
      }
    );

    const data = await response.json();

    const userDefaultAddress = data.user.address.filter((item) => {
      return item.defaultAddress === true;
    });

    setDefaultAddress(userDefaultAddress[0]);

    setAddresses(data.user.address);
    fetchProducts();
  }, [token, fetchProducts]);

  useEffect(() => {
    if (authState.loggedIn) {
      getDetails();
    } else {
      navigate("/login");
    }
  }, [
    getDetails,
    fetchProducts,
    state,
    dispatch,
    navigate,
    authState.loggedIn,
  ]);

  return (
    <>
      <Title text={"Checkout"} content={`Get all the latest gadgets here at Gadget Spot. Shop more with Gadget Spot`} />
      <div className="flex items-baseline mb-8">
        <button onClick={() => navigate("/cart")}>
          <FaChevronLeft color="#1976d2" fontSize={24} />
        </button>
        <h3 className="font-bold text-4xl mb-0 ml-4">Check out</h3>
      </div>
      {loading ? (
        <ProgressUpdate />
      ) : (
        <div className="row">
          <div className="col-lg-8">
            <div className="p-1">
              <Card sx={{ p: 3, minHeight: 620 }}>
                <div className="mb-16">
                  <div className="flex justify-between">
                    <h3 className="font-medium text-xl mb-8">
                      1. Shipping Information
                    </h3>
                  </div>
                  {addresses.length === 0 ? (
                    <AddAddressForm />
                  ) : (
                    <>
                      <div className="flex justify-between mb-8">
                        <AddAddressModal />
                        <ShowAddress
                          addresses={addresses}
                          defaultAddressId={defaultAddress._id}
                        />
                      </div>
                      <Card variant="outlined" className="p-3">
                        <div>
                          <div className="text-muted mt-2">
                            <p className="uppercase mb-1 text-black text-lg">
                              {`${defaultAddress.firstName} ${defaultAddress.lastName}`}
                            </p>
                            <p className="mb-0">
                              {`${defaultAddress.street} ${defaultAddress.city}, ${defaultAddress.state}`}
                              <br />
                              {defaultAddress.number}
                            </p>
                          </div>
                        </div>
                      </Card>
                    </>
                  )}
                </div>
                <Divider color={"black"} />
                <div className="mt-8">
                  <div className="flex justify-between">
                    <h3 className="font-medium text-xl mb-8">
                      2. Payment Infomation
                    </h3>
                  </div>
                  <Button variant="contained" color="info">
                    <img
                      src={Paystack}
                      className="w-20 h-10 object-contain"
                      alt="Paystack svg"
                    />
                  </Button>
                  <p className="text-muted text-xs mt-8">
                    We currently only accept{" "}
                    <span className="font-bold">Paystack</span> as our payment
                    method. Other payment methods would be made available...
                  </p>
                </div>
              </Card>
            </div>
          </div>
          <div className="col-lg-4">
            <div className="p-1">
              <Card sx={{ p: 3, minHeight: 620 }}>
                <h3 className="font-medium text-xl mb-8">Order Summary</h3>
                <div
                  className="max-h-56 overflow-y-scroll"
                  style={{ minHeight: 160 }}
                >
                  {cart.map((item) => {
                    return (
                      <div key={item._id}>
                        <div className="flex mb-3 mt-3">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-16 h-16 object-contain "
                          />
                          <div className="text-sm ml-4">
                            <p className="m-0">{item.name}</p>
                            <p className="text-orange-300 m-0">
                              ₦{" "}
                              {item.salePrice?.toLocaleString() ||
                                item.price?.toLocaleString()}
                            </p>
                            <p>Quantity: {item.quantity} </p>
                          </div>
                        </div>
                        <Divider />
                      </div>
                    );
                  })}
                </div>
                <div className="flex justify-between text-sm my-2">
                  <p>Subtotal</p>
                  <p>₦ {subtotal.toLocaleString()}</p>
                </div>
                <div className="flex justify-between text-sm my-2">
                  <p>Delivery Fee</p>
                  <p>₦ {deliveryFee.toLocaleString()}</p>
                </div>
                <Divider />
                <div className="flex justify-between font-bold text-lg mt-4">
                  <p>Total</p>
                  <p>₦ {total.toLocaleString()} </p>
                </div>
                <Divider />
                <CheckoutButton amount={total} />
              </Card>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Checkout;
