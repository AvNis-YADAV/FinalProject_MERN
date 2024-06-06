import { useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { useParams } from "react-router-dom";
import { Elements } from "@stripe/react-stripe-js";
import { axiosFetch } from "../../utils";
import { CheckoutForm } from "../../components";
import "./Pay.css";

const stripePromise = loadStripe(
  "pk_test_51NggwySH223NScjo02ce1MtFZJlx08pp2LRIRgKKKuhazZfFXEK5kE0YQDsi35h4HDq7ropd4N2tPFxnT4G5pzp800sNBxrfsd"
);

const Pay = () => {
  const { _id } = useParams();
  console.log(_id);
  const [clientSecret, setClientSecret] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axiosFetch.post(
          `/orders/create-payment-intent/${_id}`
        );
        console.log(data);
        setClientSecret(data.clientSecret);
      } catch ({ response }) {
        console.log(response);
      }
    })();
    window.scrollTo(0, 0);
  }, []);

  const appearance = {
    theme: "stripe",
  };

  const options = {
    clientSecret,
    appearance,
  };

  console.log(clientSecret);

  return (
    <div className="pay">
      <h2>Pay Securely with Stripe</h2>

      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      )}
    </div>
  );
};

export default Pay;
