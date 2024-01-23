import { Button } from "@mui/material";
import React from "react";
import { useState } from "react";
import { Form } from "react-bootstrap";
import AlertNotification from "../../components/Alert/Alert";
import AccountHeader from "../../components/Header/AccountHeader";
import { ProgressUpdate } from "../../components/Table/Table";
import Title from "../../components/Title/Title";

function ChangePassword() {
  const token = localStorage.getItem("token");
  const [showSuccess, setShowSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [showError, setShowError] = useState(false);
  const [passwords, setPasswords] = useState({
    currentPassword: "",
    newPassword: "",
    reEnterNewPassword: "",
  });

  const handleChange = (e) => {
    setPasswords((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    setLoading(true);
    const strongPassword = new RegExp(
      "(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})"
    );

    if (strongPassword.test(passwords.newPassword)) {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}change/password`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            token,
          },
          body: JSON.stringify({
            currentPassword: passwords.currentPassword,
            newPassword: passwords.newPassword,
            reEnterNewPassword: passwords.newPassword,
          }),
        }
      );

      const data = await response.json();

      if (data.status === "ok") {
        setShowSuccess(true);
        setFeedback(data.message);
        setTimeout(() => setShowSuccess(false), 4000);
      } else {
        setShowError(true);
        setFeedback(data.message);
        setTimeout(() => setShowError(false), 4000);
      }

      setPasswords({
        currentPassword: "",
        newPassword: "",
        reEnterNewPassword: "",
      });
    } else {
      setShowError(true);
      setFeedback(
        "Password must have at least a uppercase letter, a lowercase letter, a special character, a number and at least 8 characters."
      );
    }

    setLoading(false);
  };

  return (
    <div className="p-4">
      <Title text={"Change Password"} content={""} />
      <header className="text-left mb-4 mt-2">
        <AccountHeader title={"Change Password"} />
      </header>

      <AlertNotification
        message={feedback}
        show={showSuccess}
        severity={"success"}
      />

      <AlertNotification
        message={feedback}
        show={showError}
        severity={"error"}
      />

      <Form onSubmit={handlePasswordChange}>
        <div className="row">
          <div className="col-lg-5 mb-8">
            <label className="text-sm mb-2">Current Password</label>
            <Form.Control
              required
              onChange={handleChange}
              type="password"
              name="currentPassword"
              value={passwords.currentPassword}
              disabled={loading}
            />
          </div>
          <div className="col-lg-5 mb-8">
            <label className="text-sm mb-2">New Password</label>
            <Form.Control
              required
              onChange={handleChange}
              type="password"
              name="newPassword"
              value={passwords.newPassword}
              disabled={loading}
            />
          </div>
          <div className="col-lg-5 mb-8">
            <label className="text-sm mb-2">Re -Enter New Password</label>
            <Form.Control
              required
              onChange={handleChange}
              disabled={loading}
              type="password"
              name="reEnterNewPassword"
              value={passwords.reEnterNewPassword}
            />
          </div>
        </div>
        <div className="col-lg-10 flex justify-end my-10">
          {loading ? (
            <Button
              sx={{
                "& .MuiCircularProgress-root": {
                  height: "23px !important",
                  width: "23px !important",
                },
              }}
            >
              <ProgressUpdate />
            </Button>
          ) : (
            <Button
              type="submit"
              variant="contained"
              disabled={
                passwords.newPassword === passwords.reEnterNewPassword
                  ? false
                  : true
              }
            >
              Save
            </Button>
          )}
        </div>
      </Form>
    </div>
  );
}

export default ChangePassword;
