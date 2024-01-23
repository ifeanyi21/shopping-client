import { Button, Card, CardMedia } from "@mui/material";
import React from "react";
import { FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";

function WishListItem(props) {
  const { productId, name, price, salePrice, id, mountAgain,image } = props;

  const handleRemoveItem = async () => {
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}wishlist/remove/${id}`,
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
      mountAgain("delete");
    } else {
      mountAgain("error");
    }
  };
  return (
    <Card variant="outlined">
      <Link to={`/product/${name}/${productId}`} className="nav-link">
        <CardMedia
          sx={{ width: "100%", height:'250px', objectFit:"cover", mx: "auto",objectPosition:"top" }}
          component="img"
          alt={name}
          height="100"
          image={image}
        />
      </Link>
      <div className={`p-3`}>
        <p className="capitalize mb-2">{name}</p>
        <div className={`text-sm mb-8`}>
          {salePrice ? (
            <div className="relative">
              <span className="font-semibold mr-5 text-base">
                ₦ {salePrice.toLocaleString()}
              </span>

              <span className="text-sm line-through">
                ₦ {price.toLocaleString()}
              </span>
            </div>
          ) : (
            <div className="capitalize font-semibold text-base">
              ₦ {price.toLocaleString()}
            </div>
          )}
        </div>
        <div className="flex justify-between">
          <Button
            color="error"
            variant="contained"
            size="large"
            sx={{ width: "100%" }}
            onClick={handleRemoveItem}
          >
            <FaTrash />
          </Button>
          {/* <Button color="primary" variant="contained">
            <FaCartPlus />
          </Button> */}
        </div>
      </div>
    </Card>
  );
}

export default WishListItem;
