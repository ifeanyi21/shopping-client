import { Alert, Button } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { FloatingLabel, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { ProgressUpdate } from "../../components/Table/Table";
import Title from "../../components/Title/Title";
import Auth from "../../services/context/store";
import CSS from "../../assests/styles/Style.module.css";

function ResetPassword() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [notificationType, setNotificationType] = useState("");
  const [email, setEmail] = useState("");
  const [state] = useContext(Auth);
  const navigate = useNavigate();

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}reset/password`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
        }),
      }
    );
    const data = await response.json();
    if (data.status) {
      setNotificationType("success");
      setMessage(data.message);
    } else {
      setNotificationType("error");
      setMessage(data.message);
    }

    setLoading(false);
  };

  useEffect(() => {
    if (state.loggedIn) {
      navigate("/account/overview");
    }
  }, [navigate, state.loggedIn]);
  return (
    <div>
      <Title text={"Reset Password"} />
      <div className="p-3">
        <Form onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-lg-6 bg-white p-4" style={{ height: "350px" }}>
              <div className="text-center mb-8 text-2xl">
                Reset Your <span className="text-blue-600">Password</span>{" "}
              </div>
              <FloatingLabel
                controlId="floatingInput"
                label="Email address"
                className="mb-4"
              >
                <Form.Control
                  onChange={handleEmail}
                  type="email"
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
                  <Button variant="contained" size="large" type="submit">
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
            <div className="col-lg-6">
              <div className={`w-full ${CSS.animationContainer}`}>
                <lottie-player
                  src="https://assets10.lottiefiles.com/private_files/lf30_eivlwmgd.json"
                  background="transparent"
                  speed="1"
                  style={{ width: "100%", height: "320px" }}
                  loop
                  autoplay
                ></lottie-player>
              </div>
            </div>
          </div>
        </Form>
      </div>
    </div>
  );
}

export default ResetPassword;
