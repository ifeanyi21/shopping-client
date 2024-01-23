import React, { useCallback, useContext, useEffect } from "react";
import Footer from "./Footer";
import LoggedInNavbar from "./LoggedInNavbar";
import Navigation from "./Navbar";
import Auth from "../services/context/store";
import { ACTION_TYPES } from "../services/actions/actions";
import { useLocation } from "react-router-dom";

function Layout({ children }) {
  const [state, dispatch] = useContext(Auth);
  const token = localStorage.getItem("token");
  const location = useLocation();

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
    } else {
      dispatch({ type: ACTION_TYPES.LOGIN, payload: { user: data.user } });
    }
  }, [dispatch]);

  useEffect(() => {
    test();
  }, [test, token]);

  return (
    <>
      {state.loggedIn ? <LoggedInNavbar /> : <Navigation />}
      {location.pathname === "/" ? (
        <div className="mb-4">
          <div className="h-[600px]">
            <div
              className="h-[600px] relative"
              style={{
                backgroundImage: "url(/images/slide-3.jpg)",
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              <div className="md:block absolute left-[5%] top-[40%]">
                <div className="text-white mb-8">
                  <h2 className="text-red-600 md:font-bold md:text-5xl">
                    OLÓRI The elegant Vibe <br /> collection 2024
                  </h2>
                  <h4 className="font-light">Coming Soon....</h4>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
      <div className="container mb-8">{children}</div>
      <Footer />
    </>
  );
}

export default Layout;
