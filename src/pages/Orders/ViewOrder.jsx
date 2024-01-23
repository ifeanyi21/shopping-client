import { useCallback, useEffect, useState } from "react";
import Title from "../../components/Title/Title";
import { ProgressUpdate } from "../../components/Table/Table";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Divider, Rating } from "@mui/material";
import { FaChevronLeft } from "react-icons/fa";
import OrderStatus from "./OrderStatus";

function ViewOrder() {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [order, setOrder] = useState({});
  const [ratings, setRatings] = useState([]);
  const { id } = useParams();
  const getOrder = useCallback(async () => {
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}orders/order/${id}`,
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
      setOrder(data.Order);
      setRatings(data.ratings);
    } else {
      navigate("/account/orders");
    }
    setLoading(false);
  }, [id, navigate]);

  useEffect(() => {
    getOrder();
  }, [getOrder]);

  return (
    <div className={`px-6`}>
      <Title text={"View Order"} />
      <div className="p-2">
        {loading ? (
          <ProgressUpdate />
        ) : (
          <>
            <header className="text-left flex mb-2 mt-2 items-center">
              <button
                onClick={() => navigate("/account/orders")}
                className="mr-3"
              >
                <FaChevronLeft color="#1976d2" fontSize={18} />
              </button>
              <span className="text-lg">{`Order #${order.OrderId}`}</span>
            </header>
            <Divider sx={{ marginBottom: 3 }} />
            <div className="row">
              {order.Name.map((item, index) => {
                return (
                  <div className="col-lg-12 mb-8" key={index}>
                    <div className="row items-center mb-8">
                      <div className="col-lg-2 mb-2">
                        <img
                          src={order.Image[index]}
                          alt={item}
                          className="w-24 h-24 object-contain border rounded-sm"
                        />
                      </div>
                      <div className="col-lg-4 mb-2">
                        <span className="text-lg">{item}</span>
                      </div>
                      <div className="col-lg-3 mb-2">
                        <span className="text-lg">
                          Quantity : {order.Quantity[index]}
                        </span>
                      </div>
                      <div className="col-lg-3 mb-2">
                        {ratings[index] ? (
                          <Rating
                            defaultValue={ratings[index][0].rating}
                            readOnly
                          />
                        ) : (
                          <span className="text-lg">
                            {order.orderStatus === 100 ? (
                              <Button
                                color="warning"
                                sx={{
                                  px: 0,
                                }}
                                onClick={() =>
                                  navigate(
                                    `/account/orders/order/${order._id}/${order.ProductId[index]}`
                                  )
                                }
                              >
                                Rate Product
                              </Button>
                            ) : (
                              <Button
                                color="warning"
                                disabled
                                title="Rating is unavailable"
                                sx={{ px: 0 }}
                              >
                                Rate Product
                              </Button>
                            )}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
              <Divider />
              <div className="col-lg-12 mb-12">
                <OrderStatus orderStatus={order.orderStatus} />
              </div>
              <div className="col-lg-8 my-8">
                <div className="mt-4">
                  <span className="text-lg mt-4 font-bold">
                    Customer Delivery Address
                  </span>
                  <div className="text-muted mt-4">
                    <p className="uppercase mb-2 text-black text-lg">
                      {`${order.shippingAddress.firstName} ${order.shippingAddress.lastName}`}
                    </p>
                    <p className="mb-2">
                      {`${order.shippingAddress.street} ${order.shippingAddress.city}, ${order.shippingAddress.state}`}
                    </p>
                    <p className="mb-2">{order.shippingAddress.number}</p>
                  </div>
                </div>
              </div>
              <div className="col-lg-4 my-8">
                <div className="mt-4 flex justify-between">
                  <span>Subtotal</span>
                  <span>₦ {order.subtotal.toLocaleString()}</span>
                </div>
                <div className="my-4 flex justify-between">
                  <span>Delivery Fee</span>
                  <span>
                    ₦ {(order.Total - order.subtotal).toLocaleString()}
                  </span>
                </div>
                <Divider />
                <div className="font-bold text-lg mt-4 flex justify-between">
                  <span>Total</span>
                  <span>₦ {order.Total.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default ViewOrder;
