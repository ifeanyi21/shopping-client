import React, { useState, useEffect } from "react";
// import { FaInstagram } from "react-icons/fa";
// import Jumbotron from "../../components/home/Jumbotron";
import Product from "../../components/home/Product";
import Title from "../../components/Title/Title";
import { ProgressUpdate } from "../../components/Table/Table";
import { Form } from "react-bootstrap";
import { Button } from "@mui/material";
import ProductSlider from "../../components/Products/ProductSlider";
import { FaEnvelope } from "react-icons/fa";

const Home = () => {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [skirtSets, setskirtSets] = useState([]);

  const fetchProducts = async () => {
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}${"products"}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const data = await response.json();
    const filterSkirtsets = data.data.filter((item) => {
      return item.Category === 5;
    });
    setskirtSets(filterSkirtsets);
    setProducts(data.data.slice(10, 18));
    setLoading(false);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div>
      <Title text={"Home"} />
      {/* <Jumbotron /> */}
      <div className="container my-16 mb-16">
        <div className="row">
          <h4 className="md:text-3xl text-xl font-semibold text-left uppercase mb-9">
            Just In
          </h4>
          {loading ? (
            <div className="h-14">
              <ProgressUpdate />
            </div>
          ) : (
            <ProductSlider products={products} />
          )}
        </div>
      </div>
      <div className="py-5">
        <h4 className="uppercase text-4xl font-light mb-4">Stay updated</h4>
        <p className="mb-4 text-sm">
          Get heads up on new items so you can grab a piece (or more) before it
          gets sold out 😉
        </p>
        <form>
          <div className="row items-center">
            <div className="col-md-9 w-4/5 flex h-11 gap-2">
              <Form.Control
                className="md:w-[500px]"
                type="email"
                placeholder="name@example.com"
                required
              />
              <Button
                variant="contained"
                size="large"
                color="success"
                type="submit"
              >
                <FaEnvelope />
              </Button>
            </div>
          </div>
        </form>
      </div>
      <div className="container mt-16">
        <div className="row">
          <h4 className="md:text-3xl font-semibold text-xl text-left uppercase mb-9">
            Skirts Sets
          </h4>
          {loading ? (
            <div className="h-14">
              <ProgressUpdate />
            </div>
          ) : (
            skirtSets.map((product) => {
              return (
                <div className="col-lg-3 mb-10" key={product._id}>
                  <Product
                    image={product.Image}
                    productId={product._id}
                    name={product.name}
                    price={product.price}
                    salePrice={product.salePrice}
                    salePercent={product.salePercent}
                    quantity={product.quantity}
                  />
                </div>
              );
            })
          )}
        </div>
      </div>
      <div></div>
      {/* <div className="bg-gray-600 h-32 flex justify-center items-center text-white font-medium text-2xl">
        <FaInstagram /> <span className="ml-3">instagram</span>
      </div> */}
    </div>
  );
};

export default Home;
