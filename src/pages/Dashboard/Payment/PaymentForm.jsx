import { CardElement } from "@stripe/react-stripe-js";
import React from "react";

const PaymentForm = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <CardElement>
          <button type="submit">Pay for Parcel</button>
        </CardElement>
      </form>
    </div>
  );
};

export default PaymentForm;
