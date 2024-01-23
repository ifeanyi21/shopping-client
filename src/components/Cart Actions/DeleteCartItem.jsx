import { Button } from "@mui/material";
import React, { useContext } from "react";
import { ACTION_TYPES } from "../../services/actions/actions";
import Cart from "../../services/context/cart";
import Rerender from "../../services/context/rerender";

function DeleteCartItem({ productId, mountAgain }) {
  const [, dispatch] = useContext(Cart);
  const [, modalDispatch] = useContext(Rerender);
  const hanleRemove = async () => {
    modalDispatch({ type: ACTION_TYPES.RERENDER_START });
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}cartitem/remove/${productId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          token: localStorage.getItem("token"),
        },
      }
    );
    const data = await response.json();
    if (data.done) {
      dispatch({ type: ACTION_TYPES.ADD_TO_CART });
      mountAgain("delete");
    } else {
      mountAgain("error");
    }
  };
  return (
    <Button
      sx={{ width: "100%" }}
      variant="contained"
      color="error"
      size="small"
      onClick={hanleRemove}
    >
      Remove
    </Button>
  );
}

export default DeleteCartItem;
