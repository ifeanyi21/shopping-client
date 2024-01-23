import { Card } from "@mui/material";
import React, { useCallback, useContext } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SideBar from "../components/Side Bar/SideBar";
import { ACTION_TYPES } from "../services/actions/actions";
import Auth from "../services/context/store";
import Layout from "./Layout";

function AccountLayout({ children }) {
  const [state, dispatch] = useContext(Auth);
  const naviagte = useNavigate();

  const test = useCallback(async () => {
    const response = await fetch(`${process.env.REACT_APP_API_URL}test`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        token: localStorage.getItem("token"),
      },
    });

    const data = await response.json();

    if (!data.user) {
      dispatch({ type: ACTION_TYPES.LOGOUT, payload: { user: null } });
      localStorage.clear("token");
      naviagte("/login");
    } else {
      dispatch({ type: ACTION_TYPES.LOGIN, payload: { user: data.user } });
    }
  }, [dispatch, naviagte]);

  useEffect(() => {
    test();
  }, [state.loggedIn, naviagte, test]);

  return (
    <Layout>
      <div className="row">
        <SideBar />
        <div className="col-lg-9 col-md-8 p-1">
          <div className="p-2">
            <Card variant="outlined" sx={{ minHeight: 570 }}>
              {children}
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default AccountLayout;
