import { Button, CircularProgress } from "@mui/material";
import React, { useContext, useState } from "react";
import { FaHeart } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import Auth from "../../services/context/store";

function AddToWishlistButton({ wishlist, mountAgain }) {
  const navigate = useNavigate();
  const { id, name } = useParams();
  const [state] = useContext(Auth);
  const [loading, setLoading] = useState(false);
  const handleAddToWishlist = async () => {
    if (state.loggedIn) {
      setLoading(true);
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}add/wishlist/${id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            token: localStorage.getItem("token"),
          },
        }
      );
      const data = await response.json();
      if (data.done) {
        mountAgain("add");
      }
      setLoading(false);
    } else {
      navigate(`/login?/product/${name}/${id}`);
    }
  };
  return (
    <>
      {wishlist ? (
        <Button variant="contained" disabled>
          <FaHeart fontSize={24} />
        </Button>
      ) : loading ? (
        <Button>
          <CircularProgress
            sx={{ height: "25px !important", width: "25px !important" }}
            color="error"
          />
        </Button>
      ) : (
        <Button variant="contained" color="error" onClick={handleAddToWishlist}>
          <FaHeart fontSize={24} />
        </Button>
      )}
    </>
  );
}

export default AddToWishlistButton;
