import * as React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import { Link } from "react-router-dom";
import { Divider } from "@mui/material";
import LogoutButton from "../Logout Button/LogoutButton";
import {FaUserCircle,FaHome,  FaTable,  FaHeart,} from 'react-icons/fa'

export default function LoggedInDropDown(props) {
  const { user } = props;
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Button
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        sx={{
          color: "rgba(0, 0, 0, 0.55)",
          textTransform: "initial",
          fontSize: 16,
          fontWeight:700
        }}
      >
        <span className="mr-2"><FaUserCircle/></span>
        
        Hi, {user.firstName}
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <Link className="nav-link px-3 py-2" to={`/account/overview`}>
         <span className="flex items-center">
            <FaHome />
            <span className="ml-3">Account</span>
          </span>
        </Link>
        <Divider />
        <Link className="nav-link px-3 py-2" to={`/account/orders`}>
           <span className="flex items-center">
            <FaTable />
            <span className="ml-3">Orders</span>
          </span>
        </Link>
        <Link to={`/account/wishlist`} className="nav-link px-3 py-2">
          <span className="flex items-center">
            <FaHeart />
            <span className="ml-3">Wishlist</span>
          </span>
        </Link>
        <div className="px-2 py-1">
          <LogoutButton />
        </div>
      </Menu>
    </div>
  );
}
