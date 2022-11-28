import "./Payment.css";
import { usePaymentMethods } from "./usePaymentMethods";
import { PaymentMethods } from "./PaymentMethods";
import { useEffect, useState } from "react";

const useRoundUp = (amount: number) => {
  const [total, setTotal] = useState<number>(amount);
  const [tip, setTip] = useState<number>(0);
  const [agreeToDonate, setAgreeToDonate] = useState<boolean>(false);

  useEffect(() => {
    setTotal(agreeToDonate ? Math.floor(amount + 1) : amount);
    setTip(parseFloat((Math.floor(amount + 1) - amount).toPrecision(2)));
  }, [agreeToDonate, amount])

  const updateAgreeToDonate = () => {
    setAgreeToDonate((agreeToDonate) => !agreeToDonate);
  };

  return {
    total,
    tip,
    agreeToDonate,
    updateAgreeToDonate
  }
}

export const Payment = ({ amount }: { amount: number }) => {
  const { total, tip, agreeToDonate, updateAgreeToDonate } = useRoundUp(amount);
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
            onChange={updateAgreeToDonate}
            checked={agreeToDonate}
          />
          <p>
            {agreeToDonate
              ? "Thanks for your donation."
              : `I would like to donate $${tip} to charity.`}
          </p>
        </label>
      </div>
      <button className="paymentButton">${total}</button>
    </div>
  );
};
