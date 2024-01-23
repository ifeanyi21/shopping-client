import { Divider } from "@mui/material";
import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  FaAddressCard,
  FaHeart,
  FaHome,
  FaTable,
  FaUser,
  FaUserShield,
} from "react-icons/fa";
import LogoutButton from "../Logout Button/LogoutButton";

function SideBarContents() {
  const { pathname } = useLocation();

  return (
    <nav className="p-2 text-sm">
      <div className="p-2 mb-3">
        <Link
          to="/account/overview"
          className={`nav-link p-2 ${
            pathname.includes("overview")
              ? "bg-slate-200 rounded scale-105"
              : ""
          }`}
        >
          <span className="flex items-center">
            <FaHome />
            <span className="ml-3">Account</span>
          </span>
        </Link>
      </div>
      <div className="p-2 mb-3">
        <Link
          to="/account/orders"
          className={`nav-link p-2 ${
            pathname.includes("orders") ? "bg-slate-200 rounded scale-105" : ""
          }`}
        >
          <span className="flex items-center">
            <FaTable />
            <span className="ml-3">Orders</span>
          </span>
        </Link>
      </div>
      <div className="p-2 mb-3">
        <Link
          to="/account/wishlist"
          className={`nav-link p-2 ${
            pathname.includes("wishlist")
              ? "bg-slate-200 rounded scale-105"
              : ""
          }`}
        >
          <span className="flex items-center">
            <FaHeart />
            <span className="ml-3">Wishlist</span>
          </span>
        </Link>
      </div>
      <Divider />
      <div className="p-2 mb-3">
        <Link
          to="/account/customer/info"
          className={`nav-link p-2 ${
            pathname.includes("info") ? "bg-slate-200 rounded scale-105" : ""
          }`}
        >
          <span className="flex items-center">
            <FaUser />
            <span className="ml-3">My Details</span>
          </span>
        </Link>
      </div>
      <div className="p-2 mb-3">
        <Link
          to="/account/customer/address-book"
          className={`nav-link p-2 ${
            pathname.includes("address-book")
              ? "bg-slate-200 rounded scale-105"
              : ""
          }`}
        >
          <span className="flex items-center">
            <FaAddressCard />
            <span className="ml-3">Address Book</span>
          </span>
        </Link>
      </div>
      <div className="p-2 mb-3">
        <Link
          to="/account/customer/change-password"
          className={`nav-link p-2 ${
            pathname.includes("change-password")
              ? "bg-slate-200 rounded scale-105"
              : ""
          }`}
        >
          <span className="flex items-center">
            <FaUserShield />
            <span className="ml-3">Change Password</span>
          </span>
        </Link>
      </div>
      <Divider />
      <div className="p-2 mb-3 mt-5">
        <LogoutButton/>
      </div>
    </nav>
  );
}

export default SideBarContents;
