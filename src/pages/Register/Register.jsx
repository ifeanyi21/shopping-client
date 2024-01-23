import { Alert, Button } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import CSS from "../../assests/styles/Style.module.css";
import { Link, useNavigate } from "react-router-dom";
import Auth from "../../services/context/store";
import Title from "../../components/Title/Title";
import { ProgressUpdate } from "../../components/Table/Table";

function Register() {
  const navigate = useNavigate();
  const [state] = useContext(Auth);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [notificationType, setNotificationType] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handlefName = (e) => {
    const userFirstName = e.target.value;
    setFirstName(userFirstName);
  };

  const handlelName = (e) => {
    const userLastName = e.target.value;
    setLastName(userLastName);
  };

  const handleEmail = (e) => {
    const userEmail = e.target.value;
    setEmail(userEmail);
  };

  const handlePassword = (e) => {
    const userPassword = e.target.value;
    setPassword(userPassword);
  };

  const handlePasswordConfirmation = (e) => {
    setConfirmPassword(e.target.value);
  };

  const register = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    const strongPassword = new RegExp(
      "(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})"
    );
    if (strongPassword.test(password)) {
      const response = await fetch(`${process.env.REACT_APP_API_URL}register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName,
          lastName,
          email,
          password,
        }),
      });

      const data = await response.json();

      if (data.status) {
        setNotificationType("success");
        setMessage(data.message);
        setFirstName("");
        setLastName("");
        setEmail("");
        setPassword("");
        setConfirmPassword("")
      } else {
        setNotificationType("error");
        setMessage(data.message);
      }
    } else {
      setNotificationType("error");
      setMessage(
        "Password must have at least a uppercase letter, a lowercase letter, a special character, a number and at least 8 characters."
      );
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
      <Title text={"Register"} />
      <div className="d-flex mb-10 mt-10 p-2">
        <div
          className="w-full bg-white rounded-sm p-3"
          style={{ textAlign: "center", height: "720px" }}
        >
          <div>
            <Form className={"p-3"} onSubmit={register}>
              <h6 className="mb-5 text-center text-2xl">
                Sign Up, and start
                <span className="text-blue-600"> Shopping!</span>
              </h6>
              <FloatingLabel
                controlId="firstName"
                label="First Name"
                className="mb-4"
              >
                <Form.Control
                  required
                  onChange={handlefName}
                  type="text"
                  placeholder="First Name"
                  value={firstName}
                  disabled={loading}
                />
              </FloatingLabel>

              <FloatingLabel
                controlId="lastName"
                label="Last Name"
                className="mb-4"
              >
                <Form.Control
                  required
                  onChange={handlelName}
                  type="text"
                  placeholder="Last Name"
                  value={lastName}
                  disabled={loading}
                />
              </FloatingLabel>

              <FloatingLabel
                controlId="email"
                label="Email address"
                className="mb-4"
              >
                <Form.Control
                  required
                  onChange={handleEmail}
                  value={email}
                  type="email"
                  placeholder="name@example.com"
                  disabled={loading}
                />
              </FloatingLabel>

              <FloatingLabel
                controlId="password"
                label="Password"
                className="mb-4"
              >
                <Form.Control
                  required
                  onChange={handlePassword}
                  value={password}
                  type="password"
                  placeholder="Password"
                  disabled={loading}
                />
              </FloatingLabel>
              <FloatingLabel
                label="Re enter Password"
                className="mb-4"
              >
                <Form.Control
                  required
                  onChange={handlePasswordConfirmation}
                  value={confirmPassword}
                  type="password"
                  placeholder="Password"
                  disabled={loading}
                />
              </FloatingLabel>
              <div className="d-grid gap-2">
                {loading ? (
                  <Button size="large">
                    <ProgressUpdate />
                  </Button>
                ) : (
                  <Button
                    variant="contained"
                    size="large"
                    type="submit"
                    disabled={password === confirmPassword ? false : true}
                  >
                    Create Account
                  </Button>
                )}
              </div>
            </Form>
          </div>
          <div>
            <p>
              Already have an account?{" "}
              <Link to="/login" className="no-underline">
                Login
              </Link>
            </p>
          </div>
          {message && (
            <Alert sx={{ mt: 2 }} severity={notificationType}>
              {message}
            </Alert>
          )}
        </div>
        <div
          className={`w-full ${CSS.animationContainer}`}
          // style={{ backgroundColor: "#3490dc" }}
        >
          <lottie-player
            src="https://assets10.lottiefiles.com/packages/lf20_jcikwtux.json"
            background="transparent"
            speed="1"
            style={{ width: "100%", height: "100%" }}
            loop
            autoplay
          ></lottie-player>
        </div>
      </div>
    </div>
  );
}

export default Register;
