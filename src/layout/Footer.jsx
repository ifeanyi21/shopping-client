import React from "react";
import { Link } from "react-router-dom";
import Logo from "../assests/images/footer.png";

const Footer = () => {
  const categories = ["Dresses", "Jumpsuits", "Short sets", "Skirt sets"];
  return (
    <div className="bg-green-800 text-white text-left p-10">
      <div className="container">
        <div className="row">
          <div className="col-lg-3 mb-3">
            <h6 className="uppercase">
              <img src={Logo} alt="OgBest" className="w-20" />
            </h6>
            <p>
              We are a ready to wear brand for women around the world. All
              pieces are made with ❤️ in Lagos, Nigeria.
            </p>
          </div>
          <div className="col-lg-3"></div>
          <div className="col-lg-3 mb-3">
            <h6 className="uppercase font-semibold text-xl">Policies</h6>
            <div className="mb-8">
              <Link
                to="/shipping-returns"
                className="no-underline text-gray-200"
              >
                Shipping & Returns
              </Link>
            </div>
            <div>
              <h5 className="uppercase font-semibold text-xl">
                Hot categories
              </h5>
              <ul className="p-0 mt-2">
                {categories.map((category, index) => {
                  return (
                    <Link
                      className={`nav-link mb-3 list-none`}
                      to={`/cat/${index}`}
                      key={index}
                    >
                      {category}
                    </Link>
                  );
                })}
              </ul>
            </div>
          </div>
          <div className="col-lg-3">
            <h6 className="uppercase font-semibold text-xl">Contact Info</h6>
            <div className="my-3">
              Visit our{" "}
              <Link to={"/contact-us"} className="text-white">
                Contact
              </Link>{" "}
              page
            </div>
            <div className="mb-2">Phone: +234 806 774 9483</div>
            <div className="mb-2">Email: info@ogbest.ng</div>
            <div className="mb-2">Store open: 9:00 – 17:30, Monday –</div>
            <div className="mb-5">Friday, 10:00 – 17:00, Saturday</div>
            <img src="/images/payment.png" alt="Payment Options" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
