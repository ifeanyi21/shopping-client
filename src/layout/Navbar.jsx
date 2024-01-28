import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";
import Search from "../components/searchBar/smallSearchBar";
import LargeSearch from "../components/searchBar/largeSearchBar";
import DropDown from "../components/Dropdown/Dropdown";
import ShopDropdown from "../components/Dropdown/ShopDropdown";
import Logo from "../assests/images/logo.jpg";

function Navigation(props) {
  return (
    <div className={`bg-white sticky-top mb-8`}>
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
              className="smallScreen border-0"
            />
            <Navbar.Brand className="md:hidden flex justify-center mx-auto">
              <Link to="/" className="text-black no-underline">
                <img src={Logo} alt="OgBest" className="w-16" />
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
                <Navbar.Brand className="brand-name">
                  <Link to="/" className="text-black no-underline">
                    <img src={Logo} alt="OgBest" className="w-16" />
                  </Link>
                </Navbar.Brand>
                <div className="d-flex navbar-nav items-center">
                  <DropDown />
                  <div className="nav-link relative mr-1 px-2">
                    <span className="flex items-center">
                      <ShopDropdown />
                    </span>
                  </div>
                  <Link to="/register" className="nav-link mr-1 px-2">
                    <span className="flex items-center capitalize font-normal">
                      <span className="ml-2">Sale</span>
                    </span>
                  </Link>

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

export default Navigation;
