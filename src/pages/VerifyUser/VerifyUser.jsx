import { Alert, Card } from "@mui/material";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ProgressUpdate } from "../../components/Table/Table";
import Title from "../../components/Title/Title";
import Auth from "../../services/context/store";

function VerifyUser() {
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [notificationType, setNotificationType] = useState("");
  const [state] = useContext(Auth);
  const navigate = useNavigate();
  const location = useLocation();
  const token = location.search.slice(3, location.search.length);

  const verifyUser = useCallback(
    async (e) => {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}verify/${token}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json();
      if (data.status) {
        setNotificationType("success");

        //   setTimeout(() => {
        //     navigate("/login");
        //   }, 3000);
      } else {
        setNotificationType("error");
      }
      setMessage(data.message);
      setLoading(false);
    },
    [token]
  );

  useEffect(() => {
    if (state.loggedIn) {
      navigate("/");
    }
    verifyUser();
  }, [verifyUser, state.loggedIn, navigate]);

  return (
    <Card>
      <Title text={"Verification"} />
      {loading ? (
        <ProgressUpdate />
      ) : (
        <div>
          {notificationType === "success" ? (
            <>
              <lottie-player
                src="https://assets5.lottiefiles.com/packages/lf20_vzhtcqsd.json"
                background="transparent"
                speed="0.7"
                style={{ width: "100%", margin: "auto", height: "500px" }}
                autoplay
                loop
              ></lottie-player>
              <Alert
                sx={{ my: 8, justifyContent: "center", fontSize: 16 }}
                severity={notificationType}
              >
                {message}
              </Alert>
            </>
          ) : (
            <>
              <lottie-player
                src="https://assets5.lottiefiles.com/packages/lf20_gzlupphk.json"
                background="transparent"
                speed="0.7"
                style={{ width: "100%", margin: "auto", height: "500px" }}
                autoplay
              ></lottie-player>
              <Alert
                sx={{ my: 8, justifyContent: "center", fontSize: 16 }}
                severity={notificationType}
              >
                {message}
              </Alert>
            </>
          )}
        </div>
      )}
    </Card>
  );
}

export default VerifyUser;
