import React from "react";
import Title from "../../components/Title/Title";

function ShippingReturns() {
  return (
    <div>
      <Title text={"Shipping & Returns"} />
      <h1 className="uppercase text-center mb-16 font-normal">
        Shipping & Returns
      </h1>
      <div className="text-gray-500">
        <div className="mb-8">
          <h5 className="text-base font-extrabold mb-3">DOMESTIC SHIPPING</h5>
          <li>
            Delivery within Lagos takes 1-3 working days while deliveries
            outside Lagos but within Nigeria takes 4-6 working days.
          </li>
        </div>
        <div className="mb-8">
          <h5 className="text-base font-extrabold mb-3">
            INTERNATIONAL SHIPPING
          </h5>
          <li>
            All international orders are fulfilled by DHL so they are trackable.
            Delivery time for international orders is 5-7 working days after
            order placement.
          </li>
        </div>
        <div className="mb-8">
          <h5 className="text-base font-extrabold mb-3">RETURN POLICY</h5>
          <p>
            Item(s) are subject to RETURN/EXCHANGE/REFUND if Yemzy apparel
            receives the item/s within:
          </p>
          <h6 className="text-sm font-extrabold">TIMELINE:</h6>

          <li>
            All international orders are fulfilled by DHL so they are trackable.
            Delivery time for international orders is 5-7 working days after
            order placement.
          </li>
          <li>
            3 business days from date of delivery for orders placed within
            Lagos.
          </li>
          <li>
            5 business days from date of delivery for orders placed within
            Nigeria but outside Lagos
          </li>
          <li>
            10 business days from the date of delivery for orders shipped
            outside Nigeria
          </li>
          <li>
            The item(s) MUST physically be in our possession within the above
            time frame for the item to qualify for an exchange or refund. There
            are no exceptions to this rule.
          </li>
          <li>
            “Pick up in store” orders are only eligible for refund if picked up
            within 2 weeks of order date. Later pick ups will only be eligible
            for store credit. “Pick up in store” orders picked up later than 6
            weeks will not be eligible for exchange or refund.
          </li>
          <li>
            {" "}
            <span className="font-bold">EXCEPTIONS:</span> Items
            purchased/picked up and/or fitted in store cannot be
            returned/exchanged/refunded.
          </li>
          <li>Items bought online cannot be swapped for items in store.</li>
          <li>
            Customers who request for vouchers in store can expect within 12-24
            hours.
          </li>
        </div>

        <div className="mb-8">
          <h5 className="text-base font-extrabold mb-3">CHARGES:</h5>
          <li>
            The customer is responsible for sending the item/s back to Yemzy
            apparel
          </li>
          <li>
            In the case of an exchange, the customer is required to pay for any
            further delivery fee required.
          </li>
          <li>
            The re-delivery fee is the same cost as the initial shipping fee
            charged when the item was first ordered.
          </li>
          <li>
            Once we have received your return, an exchange will be shipped
            within 48 hours or a refund processed within 5-7 business days as
            the case may be. Depending on the payment gateway refunds might take
            longer to appear in customers bank account.
          </li>
        </div>

        <div className="mb-8">
          <h5 className="text-base font-extrabold mb-3">
            METHOD OF REFUNDING:
          </h5>
          <li>
            Refunds are issued minus the cost of shipping via the same payment
            gateway the item(s) were paid for e.g Paystack, PayPal or Stripe.
          </li>
        </div>

        <div className="mb-8">
          <h5 className="text-base font-extrabold mb-3">PRODUCT CONDITION:</h5>
          <li>
            ALL items must be received unworn, undamaged, free from blemishes
            and in its original packaging to qualify for an exchange or refund.
          </li>
          <li>
            In the case that an item is received damaged, a refund or exchange
            will not be possible regardless of circumstance. The customer will
            be responsible for any shipping cost associated with resending it
            back to them.
          </li>
          <li>
            SALE items or items bought with a discount code will NOT eligible
            for a refund or exchange regardless of circumstance. ONLY FULL PRICE
            items qualify for a refund or exchange.
          </li>
          <li>
            Finally, for a swift and seamless process, kindly ensure that your
            return meets the above terms and conditions.
          </li>
        </div>

        <div className="mb-8">
          <h5 className="text-base font-extrabold mb-3">RETURN ADDRESS:</h5>
          <h6 className="text-sm font-extrabold">Yemzy apparel</h6>
          <p>
            1, Samuel Durojaye Street, Segun Kujore Bus Stop, CMD Road, Magodo
            Ikosi, Lagos
          </p>
          <p>
            For any other information concerning returns or exchange please
            contact: +234 806 774 9483 or email: info@yemzyapparel.ng
          </p>
        </div>
      </div>
    </div>
  );
}

export default ShippingReturns;
