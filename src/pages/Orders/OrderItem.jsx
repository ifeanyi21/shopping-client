import { Card, CardMedia } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import ProductImage from "../../assests/images/image.jpeg";

function OrderItem() {
  return (
    <div className="col-lg-4 col-md-6 mb-5">
      <Link to="/product/1" className="nav-link">
        <Card variant="outlined">
          <div className={`p-3`}>
            <CardMedia
              sx={{ width: 100, mx: "auto" }}
              component="img"
              alt="green iguana"
              height="100"
              image={ProductImage}
            />
            <div>
              <p className="uppercase mb-2">Product name</p>
              <p>product price</p>
            </div>
          </div>
        </Card>
      </Link>
    </div>
  );
}

export default OrderItem;
