import { Divider, Typography } from "@mui/material";
import React from "react";
import { useLocation } from "react-router-dom";
import AddAddressModal from "../Add Address/AddAddressModal";

function AccountHeader({ title, mountAgain }) {
  const location = useLocation();
  return (
    <>
      <div className="flex justify-between mb-2 items-baseline">
        <Typography sx={{ fontSize: 18 }} color="InfoText" gutterBottom>
          {title}
        </Typography>
        {location.pathname === "/account/customer/address-book" && (
          <AddAddressModal mountAgain={mountAgain} />
        )}
      </div>
      <Divider />
    </>
  );
}

export default AccountHeader;
