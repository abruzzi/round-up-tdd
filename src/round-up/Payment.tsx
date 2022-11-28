import "./Payment.css";
import { usePaymentMethods } from "./usePaymentMethods";
import { PaymentMethods } from "./PaymentMethods";
import { useEffect, useState } from "react";

export const Payment = ({ amount }: { amount: number }) => {
  const [agreeToDonate, setAgreeToDonate] = useState<boolean>(false);
  const [total, setTotal] = useState<number>(amount);
  const [tip, setTip] = useState<number>(0);

  useEffect(() => {
    setTotal(agreeToDonate ? Math.floor(amount + 1) : amount);
    setTip(parseFloat((Math.floor(amount + 1) - amount).toPrecision(2)));
  }, [agreeToDonate, amount])

  const handleChange = () => {
    setAgreeToDonate((agreeToDonate) => !agreeToDonate);
  };

  const { paymentMethods } = usePaymentMethods();

  return (
    <div className="container">
      <h3>Payment</h3>
      <div className="paymentMethods">
        <PaymentMethods paymentMethods={paymentMethods} />
      </div>
      <div className="donation">
        <label>
          <input
            type="checkbox"
            onChange={handleChange}
            checked={agreeToDonate}
          />
          <p>{agreeToDonate
            ? "Thanks for your donation."
            : `I would like to donate $${tip} to charity.`}</p>
        </label>
      </div>
      <button className="paymentButton">${total}</button>
    </div>
  );
};
