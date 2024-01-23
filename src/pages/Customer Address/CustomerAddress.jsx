import React, { useCallback, useEffect, useState } from "react";
import AlertNotification from "../../components/Alert/Alert";
import Empty from "../../components/Empty/Empty";
import AccountHeader from "../../components/Header/AccountHeader";
import { ProgressUpdate } from "../../components/Table/Table";
import Title from "../../components/Title/Title";
import Address from "./Address";

function CustomerAddressBook(props) {
  const token = localStorage.getItem("token");
  const [loading, setLoading] = useState(true);
  const [notification, setNotification] = useState(false);
  const [notificationText, setNotificationText] = useState("");
  const [notificationType, setNotificationType] = useState("");
  const [addresses, setAddresses] = useState([]);
  const [rerender, setRerender] = useState(false);

  const mountAgain = (text) => {
    if (text === "add") {
      setNotificationType("success");
      setNotificationText("Address added successfully.");
    }

    if (text === "update") {
      setNotificationType("success");
      setNotificationText("Address updated successfully.");
    }

    if (text === "delete") {
      setNotificationType("success");
      setNotificationText("Address Deleted successfully.");
    }

    if (text === "error") {
      setNotificationText("Oops, an error occurred");
      setNotificationType("error");
    }

    if (text === "set") {
      setNotificationType("success");
      setNotificationText("Default Address Updated");
    }
    setRerender(!rerender);
    setNotification(true);
    setTimeout(() => setNotification(false), 4000);
  };

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

    setAddresses(data.user.address);
    setLoading(false);
  }, [token]);

  useEffect(() => {
    getDetails();
  }, [getDetails, rerender]);

  return (
    <div className={`px-6`}>
      <Title text={"Address"} />
      <div className="p-2">
        <header className="text-left mb-4 mt-2">
          <AccountHeader
            title={`Address Book (${addresses.length})`}
            mountAgain={mountAgain}
          />
        </header>
        <AlertNotification
          severity={notificationType}
          message={notificationText}
          show={notification}
        />
        {loading ? (
          <ProgressUpdate />
        ) : addresses.length > 0 ? (
          <div className="row">
            {addresses.map((address, index) => {
              return (
                <div className="col-lg-6 col-md-12 mb-3" key={index}>
                  <Address address={address} mountAgain={mountAgain} />
                </div>
              );
            })}
          </div>
        ) : (
          <Empty text={"You've not added an address yet!"} />
        )}
      </div>
    </div>
  );
}

export default CustomerAddressBook;
