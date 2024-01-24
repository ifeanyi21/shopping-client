import React, { useCallback, useContext, useEffect } from "react";
import Footer from "./Footer";
import LoggedInNavbar from "./LoggedInNavbar";
import Navigation from "./Navbar";
import Auth from "../services/context/store";
import { ACTION_TYPES } from "../services/actions/actions";
import { useLocation } from "react-router-dom";
import Slider from "react-slick";

function Layout({ children }) {
  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    speed: 2000,
    autoplaySpeed: 2000,
    cssEase: "linear",
  };

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
        <div className="mb-4 overflow-hidden">
          <div>
            <Slider {...settings}>
              <div className="w-full h-full">
                <img
                  src={require("../assests/images/banner21.jpg")}
                  className="md:h-[600px] h-[300px] w-full object-cover"
                  alt="banner"
                />
              </div>
              <div className="w-full h-full">
                <img
                  src={require("../assests/images/banner22.jpg")}
                  className="md:h-[600px] h-[300px] w-full object-cover"
                  alt="banner"
                />
              </div>
            </Slider>
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
