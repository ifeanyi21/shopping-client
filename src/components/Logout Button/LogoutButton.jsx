import { Button } from "@mui/material";
import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ACTION_TYPES } from "../../services/actions/actions";
import Auth from "../../services/context/store";

function LogoutButton() {
  const [, dispatch] = useContext(Auth);
  const navigate = useNavigate()
  const handleLogOut = () => {
    dispatch({ type: ACTION_TYPES.LOGOUT, payload: { user: null } });
    localStorage.clear("token");
    navigate("/")
  };

  return (
    <Button
      sx={{
        textTransform: "initial",
        fontSize: 16,
        width:"100%"
      }}
      color="warning"
      variant="contained"
      onClick={handleLogOut}
    >
      Log Out
    </Button>
  );
}

export default LogoutButton;
