import { Alert, Button } from "@mui/material";
import React, { useContext, useState } from "react";
import { FloatingLabel, Form } from "react-bootstrap";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ACTION_TYPES } from "../../services/actions/actions";
import Auth from "../../services/context/store";
import CSS from "../../assests/styles/Style.module.css";
import { useEffect } from "react";
import Title from "../../components/Title/Title";
import { ProgressUpdate } from "../../components/Table/Table";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [state, dispatch] = useContext(Auth);

  const returnUrl = useLocation();
  const pathName = returnUrl.search;
  const lengthOfUrl = pathName.length;

  const handleEmail = (e) => {
    const userEmail = e.target.value;
    setEmail(userEmail);
  };

  const handlePassword = (e) => {
    const userPassword = e.target.value;
    setPassword(userPassword);
  };

  const login = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const response = await fetch(`${process.env.REACT_APP_API_URL}login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    const data = await response.json();

    if (data.user) {
      if (returnUrl.search.length <= 2) {
        navigate("/");
      } else {
        navigate(`${pathName.substring(1, lengthOfUrl)}`);
      }
      localStorage.setItem("token", data.token);
      dispatch({ type: ACTION_TYPES.LOGIN, payload: { user: data.user } });
    } else {
      setError(data.message);
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
      <Title text={"Login"} content={`Login to your account and get all the latest gadgets here at Gadget Spot. Shop more with Gadget Spot`} />
      <div className="d-flex mb-10 mt-10 p-2">
        <div
          className="w-full bg-white rounded-sm p-3"
          style={{ textAlign: "center", height: "550px" }}
        >
          <div>
            <Form className={"px-4 py-2"} onSubmit={login}>
              <h6 className="mb-5 text-center text-2xl">
                <span className="text-blue-600">Hey,</span> welcome back!
              </h6>
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
              <FloatingLabel
                controlId="floatingPassword"
                label="Password"
                className="mb-4"
              >
                <Form.Control
                  onChange={handlePassword}
                  type="password"
                  placeholder="Password"
                  required
                  disabled={loading}
                />
              </FloatingLabel>
              <div className="d-grid gap-2 my-6">
                {loading ? (
                  <Button size="large">
                    <ProgressUpdate />
                  </Button>
                ) : (
                  <Button variant="contained" size="large" type="submit">
                    Sign In
                  </Button>
                )}
              </div>
            </Form>
          </div>
          <div>
            <span>
              <Link
                to={`/register${pathName}`}
                className="no-underline font-bold"
              >
                Create an account
              </Link>
            </span>
            <div className="mt-8">
              <span>Forgotten your password? </span>
              <Link to={`/reset/password`} className="no-underline">
                Reset Password
              </Link>
            </div>
            {error && (
              <Alert sx={{ mt: 2 }} severity="error">
                {error}
              </Alert>
            )}
          </div>
        </div>
        <div
          className={`w-full ${CSS.animationContainer}`}
          // style={{ backgroundColor: "#3490dc" }}
        >
          <lottie-player
            src="https://assets1.lottiefiles.com/packages/lf20_dn6rwtwl.json"
            background="transparent"
            speed="0.4"
            style={{ width: "100%", height: "500px" }}
            loop
            autoplay
          ></lottie-player>
        </div>
      </div>
    </div>
  );
}

export default Login;
