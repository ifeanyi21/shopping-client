import * as React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import { Link, useLocation } from "react-router-dom";
import { Divider } from "@mui/material";
import { FaHeart, FaTable, FaUserCircle } from "react-icons/fa";

export default function DropDown() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const navigate = useLocation();
  const pathName = navigate.pathname;

  return (
    <div>
      <Button
        id="basic-button"
        color="success"
        variant="contained"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        <FaUserCircle size={20} />
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <Link className="nav-link px-3 py-2" to={`/login?${pathName}`}>
          <Button variant="contained" onClick={handleClose}>
            Sign In
          </Button>
        </Link>

        <Divider />

        <Link
          className="nav-link px-3 py-2"
          to={`/login?/account/orders`}
          onClick={handleClose}
        >
          <span className="flex items-center">
            <FaTable />
            <span className="ml-3">Orders</span>
          </span>
        </Link>

        <Link
          to={`/login?/account/wishlist`}
          className="nav-link px-3 py-2"
          onClick={handleClose}
        >
          <span className="flex items-center">
            <FaHeart />
            <span className="ml-3">Wishlist</span>
          </span>
        </Link>
      </Menu>
    </div>
  );
}
