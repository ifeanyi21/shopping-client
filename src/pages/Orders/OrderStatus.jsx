import ProgressBar from "react-bootstrap/ProgressBar";

function OrderStatus({ orderStatus }) {
  let orderInfo = "";
  if (orderStatus === 25) {
    orderInfo = "Processing";
  }
  if (orderStatus === 50) {
    orderInfo = "Confirmed";
  }
  if (orderStatus === 75) {
    orderInfo = "Shipped";
  }
  if (orderStatus === 100) {
    orderInfo = "Delivered";
  }
  return (
    <>
      {orderStatus === 100 ? (
        <ProgressBar now={orderStatus} variant="success" label={`${orderInfo} Order`} />
      ) : (
        <ProgressBar now={orderStatus} label={`${orderInfo} Order`} animated />
      )}
    </>
  );
}

export default OrderStatus;
