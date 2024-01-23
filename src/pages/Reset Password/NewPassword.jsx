import { Alert, Button } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { FloatingLabel, Form } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import { ProgressUpdate } from "../../components/Table/Table";
import Title from "../../components/Title/Title";
import Auth from "../../services/context/store";

function NewPassword() {
  const location = useLocation();
  const token = location.search.slice(3, location.search.length);

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [notificationType, setNotificationType] = useState("");
  const [passwords, setPasswords] = useState({
    newPassword: "",
    reEnterNewPassword: "",
  });
  const [state] = useContext(Auth);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setPasswords((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const strongPassword = new RegExp(
      "(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})"
    );
    if (!strongPassword.test(passwords.newPassword)) {
      setNotificationType("error");
      setMessage("Not a strong a password");
      setLoading(false);
      return;
    }

    const response = await fetch(
      `${process.env.REACT_APP_API_URL}new/user/password/${token}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          newPassword: passwords.newPassword,
        }),
      }
    );

    const data = await response.json();
    if (data.status) {
      setNotificationType("success");
      setPasswords({
        newPassword: "",
        reEnterNewPassword: "",
      });
      setTimeout(() => {
        navigate("/login");
      }, 3000);
    } else {
      setNotificationType("error");
    }
    setMessage(data.message);
    setLoading(false);
  };
  useEffect(() => {
    if (state.loggedIn) {
      navigate("/account/overview");
    }
  }, [navigate, state.loggedIn]);
  return (
    <div>
      <Title text={"Enter Password"} />
      <Form onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-lg-6 bg-white p-4" style={{ height: "450px" }}>
            <div className="text-center mb-8 text-2xl">
              Enter Your New <span className="text-blue-600">Password</span>{" "}
            </div>
            <FloatingLabel label="Enter new password" className="mb-4">
              <Form.Control
                onChange={handleChange}
                type="password"
                name="newPassword"
                placeholder="name@example.com"
                required
                disabled={loading}
              />
            </FloatingLabel>

            <FloatingLabel label="Confirm new password" className="mb-4">
              <Form.Control
                onChange={handleChange}
                type="password"
                name="reEnterNewPassword"
                placeholder="name@example.com"
                required
                disabled={loading}
              />
            </FloatingLabel>
            <div className="d-grid gap-2 my-8">
              {loading ? (
                <Button size="large">
                  <ProgressUpdate />
                </Button>
              ) : (
                <Button
                  variant="contained"
                  size="large"
                  type="submit"
                  disabled={
                    passwords.newPassword === passwords.reEnterNewPassword
                      ? false
                      : true
                  }
                >
                  Reset Password
                </Button>
              )}
            </div>
            {message && (
              <Alert sx={{ mt: 2 }} severity={notificationType}>
                {message}
              </Alert>
            )}
          </div>
        </div>
      </Form>
    </div>
  );
}

export default NewPassword;
