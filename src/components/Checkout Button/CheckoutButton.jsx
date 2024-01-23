import { Button } from "@mui/material";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Rerender from "../../services/context/rerender";
import { ProgressUpdate } from "../Table/Table";

function CheckoutButton({ amount }) {
  const [loading, setLoading] = useState(false);
  const [addresses, setAddresses] = useState(0);
  const [state] = useContext(Rerender);
  const navigate = useNavigate();
  const checkout = async (e) => {
    e.preventDefault();
    setLoading(true);

    const response = await fetch(
      `${process.env.REACT_APP_API_URL}transaction/initialize`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          token: localStorage.getItem("token"),
        },
        body: JSON.stringify({
          amount,
        }),
      }
    );

    const data = await response.json();
    if (data.status) {
      window.location.href = data.redirectUrl;
    } else {
      navigate("/cart");
    }
  };

  const getDetails = useCallback(async () => {
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}customerDetails`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          token: localStorage.getItem("token"),
        },
      }
    );

    const data = await response.json();

    setAddresses(data.user.address.length);
    setLoading(false);
  }, []);

  useEffect(() => {
    getDetails();
  }, [getDetails, state]);

  return (
    <>
      {addresses === 0 ? (
        <Button
          disabled
          sx={{ width: "100%", marginTop: 2 }}
          variant="contained"
        >
          Checkout
        </Button>
      ) : loading ? (
        <Button
          variant="contained"
          sx={{
            "& .MuiCircularProgress-root": {
              height: "23px !important",
              width: "23px !important",
            },
            width: "100%",
            height: 35,
            marginTop: 2,
          }}
        >
          <ProgressUpdate />
        </Button>
      ) : (
        <Button
          onClick={checkout}
          sx={{ width: "100%", marginTop: 2 }}
          variant="contained"
        >
          Checkout
        </Button>
      )}
    </>
  );
}

export default CheckoutButton;
