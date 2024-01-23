import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// eslint-disable-next-line
import * as LottiePlayer from "@lottiefiles/lottie-player";
import Home from "./pages/Home/Home";
import Layout from "./layout/Layout";
import SearchResult from "./pages/Search Result/SearchResult";
import ViewProduct from "./pages/View Product/ViewProduct";
import ScrollToTop from "./components/Scroll To Top/ScrollToTop";
import Cart from "./pages/Cart/Cart";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import { LoggedInProvider } from "./services/context/store";
import { CartProvider } from "./services/context/cart";
import OverView from "./pages/OverView/OverView";
import AccountLayout from "./layout/AccountLayout";
import Orders from "./pages/Orders/Orders";
import Wishlist from "./pages/Wishlist/Wishlist";
import CustomerInfo from "./pages/Customer Info/CustomerInfo";
import CustomerAddressBook from "./pages/Customer Address/CustomerAddress";
import ChangePassword from "./pages/Change Password/ChangePassword";
import ViewOrder from "./pages/Orders/ViewOrder";
import Error from "./pages/Error/Error";
import { RerenderProvider } from "./services/context/rerender";
import Checkout from "./pages/Checkout/Checkout";
import OrderConfirmed from "./pages/Confirmation/OrderConfirmed";
import { SortProvider } from "./services/context/sort";
import ViewBrand from "./pages/Brand/Brand";
import ViewProductCategory from "./pages/Search Result/ViewProductCategory";
import Rate from "./pages/Rate/Rate";
import ResetPassword from "./pages/Reset Password/ResetPassword";
import NewPassword from "./pages/Reset Password/NewPassword";
import VerifyUser from "./pages/VerifyUser/VerifyUser";
import Contact from "./pages/Contact Us/Contact";
import ShippingReturns from "./pages/Shipping-Returns/ShippingReturns";
import News from "./pages/News/News";

function App() {
  const client = new QueryClient();
  return (
    <div className="App">
      <QueryClientProvider client={client}>
        <LoggedInProvider>
          <RerenderProvider>
            <CartProvider>
              <SortProvider>
                <BrowserRouter>
                  <ScrollToTop />
                  <Routes>
                    <Route path="/" element={<Layout children={<Home />} />} />
                    <Route
                      path="/contact-us"
                      element={<Layout children={<Contact />} />}
                    />
                    <Route
                      path="/news"
                      element={<Layout children={<News />} />}
                    />
                    <Route
                      path="/sch/:content/"
                      element={<Layout children={<SearchResult />} />}
                    />

                    <Route
                      path="/cat/:content/"
                      element={<Layout children={<ViewProductCategory />} />}
                    />

                    <Route
                      path="/product/:name/:id"
                      element={<Layout children={<ViewProduct />} />}
                    />

                    <Route
                      path="/brand/:name/"
                      element={<Layout children={<ViewBrand />} />}
                    />

                    <Route
                      path="/cart"
                      element={<Layout children={<Cart />} />}
                    />
                    <Route
                      path="/login"
                      element={<Layout children={<Login />} />}
                    />
                    <Route
                      path="/reset/password"
                      element={<Layout children={<ResetPassword />} />}
                    />

                    <Route
                      path="/confirmation"
                      element={<Layout children={<NewPassword />} />}
                    />

                    <Route
                      path="/register"
                      element={<Layout children={<Register />} />}
                    />

                    <Route
                      path="/verify"
                      element={<Layout children={<VerifyUser />} />}
                    />

                    <Route
                      path="/checkout"
                      element={<Layout children={<Checkout />} />}
                    />
                    <Route
                      path="/confirm/order"
                      element={<Layout children={<OrderConfirmed />} />}
                    />
                    <Route
                      path="/account/overview"
                      element={<AccountLayout children={<OverView />} />}
                    />
                    <Route
                      path="/account/orders"
                      element={<AccountLayout children={<Orders />} />}
                    />
                    <Route
                      path="/account/orders/order/:id"
                      element={<AccountLayout children={<ViewOrder />} />}
                    />
                    <Route
                      path="/account/orders/order/:id/:product"
                      element={<AccountLayout children={<Rate />} />}
                    />
                    <Route
                      path="/account/wishlist"
                      element={<AccountLayout children={<Wishlist />} />}
                    />
                    <Route
                      path="/account/customer/info"
                      element={<AccountLayout children={<CustomerInfo />} />}
                    />
                    <Route
                      path="/account/customer/address-book"
                      element={
                        <AccountLayout children={<CustomerAddressBook />} />
                      }
                    />

                    <Route
                      path="/account/customer/change-password"
                      element={<AccountLayout children={<ChangePassword />} />}
                    />

                    <Route
                      path="/shipping-returns"
                      element={<Layout children={<ShippingReturns />} />}
                    />

                    <Route path="*" element={<Layout children={<Error />} />} />
                  </Routes>
                </BrowserRouter>
              </SortProvider>
            </CartProvider>
          </RerenderProvider>
        </LoggedInProvider>
      </QueryClientProvider>
    </div>
  );
}

export default App;
