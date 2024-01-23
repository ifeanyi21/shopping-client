import { Button, Card } from "@mui/material";
import React, { useContext, useState, useEffect, useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ProgressUpdate } from "../../components/Table/Table";
import Title from "../../components/Title/Title";
import { ACTION_TYPES } from "../../services/actions/actions";
import Cart from "../../services/context/cart";

function OrderConfirmed() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [confirmed, setConfirmed] = useState(false);
  const [, dispatch] = useContext(Cart);
  const location = useLocation();
  const navigate = useNavigate();

  const checkout = useCallback(
    async (e) => {
      setLoading(true);

      try {
        const reference = location.search.split("&");
        const referenceKey = reference[0].slice(8);
        const response = await fetch(
          `${process.env.REACT_APP_API_URL}/transaction/verify/${referenceKey}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              token: localStorage.getItem("token"),
            },
          }
        );

        const data = await response.json();
        if (data.status) {
          setConfirmed(true);
          dispatch({ type: ACTION_TYPES.ADD_TO_CART });
        } else {
          setError(true);
        }

        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    },
    [location.search, dispatch]
  );

  useEffect(() => {
    if (location.search.includes("trxref") !== 0) {
      checkout();
    } else {
      navigate("/");
    }
  }, [checkout, location.search, navigate]);
  return (
    <div>
      <Title text={"Order Confirmation"} content={`Get all the latest gadgets here at Gadget Spot. Shop more with Gadget Spot`} />
      {loading ? (
        <ProgressUpdate />
      ) : (
        <Card sx={{ minHeight: 600 }}>
          {confirmed && (
            <>
              <lottie-player
                src="https://assets10.lottiefiles.com/packages/lf20_w8cudppm.json"
                background="transparent"
                speed="0.4"
                autoplay
                style={{ width: "100%", margin: "auto", height: "500px" }}
              ></lottie-player>
              <Button
                color="success"
                variant="contained"
                size="large"
                sx={{ display: "flex", margin: "auto", width: "70%" }}
                onClick={() => navigate("/account/orders")}
              >
                View Order
              </Button>
            </>
          )}
          {error && (
            <>
              <lottie-player
                src="https://assets9.lottiefiles.com/private_files/lf30_mlsj6yqm.json"
                background="transparent"
                speed="1"
                style={{ width: "100%", margin: "auto", height: "400px" }}
                autoplay
              ></lottie-player>
              <Button
                color="error"
                variant="contained"
                size="large"
                sx={{
                  display: "flex",
                  margin: "auto",
                  width: "70%",
                  marginTop: 10,
                }}
              >
                Home
              </Button>
            </>
          )}
        </Card>
      )}
    </div>
  );
}

export default OrderConfirmed;
