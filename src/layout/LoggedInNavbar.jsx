import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link, useNavigate } from "react-router-dom";
import { useCallback, useContext, useEffect, useState } from "react";
import Badge from "react-bootstrap/Badge";
import Search from "../components/searchBar/smallSearchBar";
import LargeSearch from "../components/searchBar/largeSearchBar";
import LoggedInDropDown from "../components/Dropdown/LoggedInDropDown";
import Cart from "../services/context/cart";
import Auth from "../services/context/store";
import { FaShoppingBasket } from "react-icons/fa";
import ShopDropdown from "../components/Dropdown/ShopDropdown";
import Logo from "../assests/images/logo.jpg";

function LoggedInNavbar(props) {
  const [user] = useContext(Auth);
  const [state] = useContext(Cart);
  const [cartLength, setCartLength] = useState("");
  const naviagte = useNavigate();
  const token = localStorage.getItem("token");

  const fetchProducts = useCallback(async () => {
    const response = await fetch(`${process.env.REACT_APP_API_URL}cart/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        token,
      },
    });

    const data = await response.json();
    setCartLength(data.cart.length);
    // eslint-disable-next-line
  }, [token, state]);

  useEffect(() => {
    if (!user.loggedIn) {
      naviagte("/login");
    } else {
      fetchProducts();
    }
  }, [user.loggedIn, naviagte, fetchProducts]);

  return (
    <div className={`bg-white sticky-top shadow-sm mb-8`}>
      <div className="container">
        <Navbar
          expand="md"
          className="mb-3"
          style={{ justifyContent: "start" }}
        >
          <>
            <Navbar.Toggle
              aria-controls={`offcanvasNavbar-expand-md`}
              style={{ marginRight: 1, fontSize: 14 }}
              className="smallScreen"
            />
            <Navbar.Brand className="md:hidden flex justify-center mx-auto">
              <Link to="/" className="text-black no-underline">
                <img src={Logo} alt="OgBest" className="w-10" />
              </Link>
            </Navbar.Brand>
            <Search />
            <Navbar.Collapse
              style={{ width: "70%" }}
              id="offcanvasNavbar-expand-md"
              aria-labelledby={`offcanvasNavbarLabel-expand-md`}
              placement="start"
            >
              <Nav className="justify-between flex-grow-1 items-center">
                <div className="d-flex navbar-nav items-center mt-2">
                  <LoggedInDropDown user={user.user} />
                  <div className="nav-link relative mr-1 px-2">
                    <span className="flex items-center">
                      <ShopDropdown />
                    </span>
                  </div>
                  <Link to="/cart" className="nav-link relative mr-3">
                    <span className="flex items-center">
                      <FaShoppingBasket />
                      <span className="ml-2 font-bold">
                        Cart
                        <Badge className="-top-1 absolute badgeColor" pill>
                          {cartLength}
                        </Badge>
                      </span>
                    </span>
                  </Link>
                </div>
                <Navbar.Brand className="brand-name">
                  <Link to="/" className="text-black no-underline">
                    <img src={Logo} alt="OgBest" className="w-10" />
                  </Link>
                </Navbar.Brand>
                <div className="flex items-center">
                  <LargeSearch />
                </div>
              </Nav>
            </Navbar.Collapse>
          </>
        </Navbar>
      </div>
    </div>
  );
}

export default LoggedInNavbar;
