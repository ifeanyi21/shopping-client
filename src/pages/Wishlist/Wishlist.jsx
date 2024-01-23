import React, { useCallback, useEffect, useState } from "react";
import AlertNotification from "../../components/Alert/Alert";
import Empty from "../../components/Empty/Empty";
import AccountHeader from "../../components/Header/AccountHeader";
import { ProgressUpdate } from "../../components/Table/Table";
import Title from "../../components/Title/Title";
import WishListItem from "./WishListItem";
import ReactPaginate from "react-paginate";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

function Wishlist() {
  const [loading, setLoading] = useState(true);
  const [notificationText, setNotificationText] = useState("");
  const [notificationType, setNotificationType] = useState("");
  const [loadingAlert, setLoadingAlert] = useState(false);
  const [rerender, setRerender] = useState(false);

  const [wishlist, setWishlist] = useState([]);

  const [pageNumber, setPageNumber] = useState(0);
  const contentPerPage = 6;
  const pagesVisited = pageNumber * contentPerPage;

  const pageCount = Math.ceil(wishlist.length / contentPerPage);

  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  const fetchProducts = useCallback(async () => {
    const response = await fetch(`${process.env.REACT_APP_API_URL}wishlist`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        token: localStorage.getItem("token"),
      },
    });

    const data = await response.json();
    setWishlist(data.wishlist);
    setLoading(false);
  }, []);

  const mountAgain = (text) => {
    if (text === "delete") {
      setNotificationType("success");
      setNotificationText("Item removed from wishlist.");
    }

    if (text === "error") {
      setNotificationText("Oops, an error occurred");
      setNotificationType("error");
    }

    setLoadingAlert(true);
    setRerender(!rerender);
    setTimeout(() => setLoadingAlert(false), 4000);
  };

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts, rerender]);
  return (
    <>
      <Title text={"Wishlist"} />
      <AlertNotification
        severity={notificationType}
        message={notificationText}
        show={loadingAlert}
      />
      {loading ? (
        <div className="min-h-screen mt-16">
          <ProgressUpdate />
        </div>
      ) : (
        <div className={`px-6`}>
          <div className="p-2">
            <header className="text-left mb-4 mt-2">
              <AccountHeader title={"Wishlist"} />
            </header>
            {wishlist.length > 0 ? (
              <div className="row">
                {wishlist
                  .slice(pagesVisited, pagesVisited + contentPerPage)
                  .map((item) => {
                    return (
                      <div className="col-lg-4 col-md-6 mb-5" key={item._id}>
                        <WishListItem
                          productId={item.productId}
                          image={item.image}
                          name={item.name}
                          price={item.price}
                          salePrice={item.salePrice}
                          id={item._id}
                          mountAgain={mountAgain}
                        />
                      </div>
                    );
                  })}
              </div>
            ) : (
              <Empty text={"Your Wishlist is empty"} />
            )}
          </div>
          {wishlist.length > 0 && (
            <ReactPaginate
              previousLabel={<FaChevronLeft color="#000" />}
              nextLabel={<FaChevronRight color="#000" />}
              pageCount={pageCount}
              onPageChange={changePage}
              containerClassName={"pagination"}
              subContainerClassName={"pages pagination"}
              activeClassName={"active"}
              nextLinkClassName={"nextBtn"}
              previousLinkClassName={"prevBtn"}
            />
          )}
        </div>
      )}
    </>
  );
}

export default Wishlist;
