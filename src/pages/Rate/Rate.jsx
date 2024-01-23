import React, { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ProgressUpdate } from "../../components/Table/Table";
import Title from "../../components/Title/Title";
import ProductImage from "../../assests/images/image.jpeg";
import { FaChevronLeft } from "react-icons/fa";
import { Divider } from "@mui/material";
import RateForm from "./RateForm";

function Rate() {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [order, setOrder] = useState({});
  const { id, product } = useParams();

  const getOrder = useCallback(async () => {
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}rate/${id}/${product}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          token: localStorage.getItem("token"),
        },
      }
    );

    const data = await response.json();
    if (data.status) {
      setOrder(data.product);
    } else {
      navigate("/account/orders");
    }
    setLoading(false);
  }, [id, navigate, product]);

  useEffect(() => {
    getOrder();
  }, [getOrder]);
  return (
    <div className={`px-6`}>
      <Title text={"Rate Product"} />
      <div className="p-2">
        {loading ? (
          <ProgressUpdate />
        ) : (
          <>
            <header className="text-left flex mb-2 mt-2 items-center">
              <button onClick={() => navigate(-1)} className="mr-3">
                <FaChevronLeft color="#1976d2" fontSize={18} />
              </button>
              <span className="text-lg capitalize">{`Rate ${order.name}`}</span>
            </header>
            <Divider sx={{ marginBottom: 3 }} />
            <div className="row">
              <div className="col-lg-12 mb-3">
                <div className="row items-center">
                  <div className="col-lg-3 mb-2">
                    <img
                      src={ProductImage}
                      alt=""
                      className="w-24 h-24 object-contain border rounded-sm"
                    />
                  </div>
                  <div className="col-lg-5 mb-2">
                    <span className="text-lg">{order.name}</span>
                  </div>
                </div>
              </div>
              <Divider />
              <div className="col-lg-12 mb-4">
                <RateForm orderId={id} />
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Rate;
