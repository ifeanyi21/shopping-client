import { Card, Divider } from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
//import AddProductBtn from "../../components/Add Product/AddProductBtn";
import AccountHeader from "../../components/Header/AccountHeader";
import { ProgressUpdate } from "../../components/Table/Table";
import Title from "../../components/Title/Title";

function Dashboard() {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState({});
  const [orderLength, setOrderLength] = useState(0);
  const [defaultAddress, setDefaultAddress] = useState({});
  const token = localStorage.getItem("token");

  const getOrders = useCallback(async () => {
    const response = await fetch(`${process.env.REACT_APP_API_URL}orders`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        token: localStorage.getItem("token"),
      },
    });

    const data = await response.json();
    if (data.status) {
      setOrderLength(data.Orders.length);
    }
    setLoading(false);
  }, []);

  const getDetails = useCallback(async () => {
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}customerDetails`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          token,
        },
      }
    );

    const data = await response.json();

    const userAddress = data.user.address.filter((item) => {
      return item.defaultAddress === true;
    });

    setDefaultAddress(userAddress[0]);
    setUser(data.user);
    getOrders();
  }, [token, getOrders]);

  useEffect(() => {
    getDetails();
  }, [getDetails]);

  return (
    <div className={`px-6`}>
      <Title text={"Dashboard"} content={`Access your account and get all the latest gadgets here at Gadget Spot. Shop more with Gadget Spot`} />
      <div className="p-2">
        <header className="text-left mb-4 mt-2">
          <AccountHeader title={"Account Overview"} />
        </header>
        {loading ? (
          <ProgressUpdate />
        ) : (
          <div className="row">
            <div className="col-lg-6 col-md-12 mb-8">
              <Card variant="outlined" sx={{ minHeight: 200 }}>
                <div className="p-3">
                  <span className="text-base">Account Details</span>
                  <Divider />
                  <div className="mt-4">
                    <p className="uppercase">{`${user.firstName} ${user.lastName}`}</p>
                    <p className="mb-2 font-thin">{user.email}</p>
                  </div>
                </div>
              </Card>
            </div>
            <div className="col-lg-6 col-md-6 mb-8">
              <Card variant="outlined" sx={{ minHeight: 200 }}>
                <div className="p-3">
                  <span className="text-base">Address Book</span>
                  <Divider />
                  <div className="mt-4">
                    {user.address.length === 0 ? (
                      <p className="text-muted">No Address Added Yet!</p>
                    ) : (
                      <>
                        <span>Your default shipping address:</span>
                        <div className="text-muted mt-2 text-sm">
                          <p className="uppercase mb-0">{`${defaultAddress.firstName} ${defaultAddress.lastName}`}</p>
                          <p className="mb-0">{`${defaultAddress.street} ${defaultAddress.city}, ${defaultAddress.state}`}</p>
                          <p>{defaultAddress.number}</p>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </Card>
            </div>
            <div className="col-lg-6 col-md-6 mb-8">
              <Card variant="outlined" sx={{ minHeight: 200 }}>
                <div className="p-3">
                  <span className="text-base">Orders</span>
                  <Divider />
                  <div className="mt-4">
                    {orderLength === 0 ? (
                      <p className="capitalize mb-2">
                        You're yet to place an order. What are you waiting for? 
                        {" 🌚"}
                      </p>
                    ) : (
                      <p className="capitalize mb-2">
                        You've made {orderLength} order(s). 👌
                      </p>
                    )}
                  </div>
                </div>
                {/* <AddProductBtn/> */}
              </Card>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
