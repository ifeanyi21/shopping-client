import * as React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import { Link } from "react-router-dom";


export function ToggleIcon() {
  return (
    <svg
      width="15"
      height="4"
      viewBox="0 0 15 4"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M1.7251 3.5C1.30843 3.5 0.954431 3.354 0.663098 3.062C0.371098 2.77067 0.225098 2.41667 0.225098 2C0.225098 1.58333 0.371098 1.22933 0.663098 0.938C0.954431 0.646 1.30843 0.5 1.7251 0.5C2.14176 0.5 2.4961 0.646 2.7881 0.938C3.07943 1.22933 3.2251 1.58333 3.2251 2C3.2251 2.41667 3.07943 2.77067 2.7881 3.062C2.4961 3.354 2.14176 3.5 1.7251 3.5ZM7.5001 3.5C7.08343 3.5 6.72943 3.354 6.4381 3.062C6.1461 2.77067 6.0001 2.41667 6.0001 2C6.0001 1.58333 6.1461 1.22933 6.4381 0.938C6.72943 0.646 7.08343 0.5 7.5001 0.5C7.91676 0.5 8.27076 0.646 8.5621 0.938C8.8541 1.22933 9.0001 1.58333 9.0001 2C9.0001 2.41667 8.8541 2.77067 8.5621 3.062C8.27076 3.354 7.91676 3.5 7.5001 3.5ZM13.2751 3.5C12.8584 3.5 12.5044 3.354 12.2131 3.062C11.9211 2.77067 11.7751 2.41667 11.7751 2C11.7751 1.58333 11.9211 1.22933 12.2131 0.938C12.5044 0.646 12.8584 0.5 13.2751 0.5C13.6918 0.5 14.0461 0.646 14.3381 0.938C14.6294 1.22933 14.7751 1.58333 14.7751 2C14.7751 2.41667 14.6294 2.77067 14.3381 3.062C14.0461 3.354 13.6918 3.5 13.2751 3.5Z"
        fill="#1C1B1F"
      />
    </svg>
  );
}

export default function ViewOrderDropDown({id}) {
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
        }}
      >
        <ToggleIcon/>
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
        <Link className="nav-link px-3 py-2" to={`/account/orders/order/${id}`}>
          View Order
        </Link>
      </Menu>
    </div>
  );
}
