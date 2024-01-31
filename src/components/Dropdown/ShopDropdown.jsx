import * as React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import { Link } from "react-router-dom";
import { FaChevronDown } from "react-icons/fa";

export default function ShopDropdown() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const categories = [
    "Suits & Blazers",
    "Sweat shirts & Hoodies",
    "Trousers, Pants & Chinos",
    "Ties",
    "Short sets",
    "Skirt sets",
  ];

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
        <span className="mr-2">
          <FaChevronDown />
        </span>
        <span
          className="capitalize font-normal"
          style={{ color: "rgba(0, 0, 0, 0.55)" }}
        >
          Shop
        </span>
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        //  "& .MuiDataGrid-columnSeparator--sideRight": {
        //   display: "none !important",
        // },
        sx={{
          "& .MuiList-root": {
            width: 200,
            px: 3,
          },
        }}
        onClose={handleClose}
        onClick={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        {categories.map((category, index) => {
          return (
            <Link
              className={`nav-link mb-3 hover:!text-green-700 w-full hover:rounded-none rounded-xl p-2`}
              to={`/cat/${index}`}
              key={index}
            >
              {category}
            </Link>
          );
        })}
      </Menu>
    </div>
  );
}
