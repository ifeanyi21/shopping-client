import { Button } from "@mui/material";
import React from "react";

function AddProductBtn() {
  const token = localStorage.getItem("token");
  const handleProduct = async () => {
    const response = await fetch(`${process.env.REACT_APP_API_URL}addproduct`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        token,
      },
    });

    const data = await response.json();
    console.log(data);
  };
  return (
    <Button color="secondary" variant="contained" onClick={handleProduct}>
      Add Product
    </Button>
  );
}

export default AddProductBtn;
