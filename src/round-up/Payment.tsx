import { useMemo, useState } from "react";
import { useRoundUp } from "./useRoundUp";

import "./payment.css";

function formatMessage(agreeToDonate: boolean, tip: number) {
  return agreeToDonate
    ? "Thanks for your donation."
    : `I would like to donate $${tip} to charity.`;
}

export const Payment = ({
  amount,
  methods = [],
}: {
  amount: number;
  methods?: string[];
}) => {
  const [agreeToDonate, setAgreeToDonate] = useState<boolean>(false);
  const { total, tip } = useRoundUp(amount, agreeToDonate);

  const handleChange = () => {
    setAgreeToDonate((agreeToDonate) => !agreeToDonate);
  };

  const paymentMethods = useMemo(() => {
    if (methods.length > 0) {
      const extended = methods.map((method) => ({
        provider: method,
        label: `Pay with ${method}`,
      }));
      extended.push({ provider: "cash", label: "Pay in cash" });
      return extended;
    }
    return [];
  }, [methods]);

  return (
    <div className="container">
      <h3>Payment</h3>
      <div className="paymentMethods">
        {paymentMethods.map((method) => (
          <label key={method.provider}>
            <input
              type="radio"
              name="payment"
              value={method.provider}
              defaultChecked={method.provider === "cash"}
            />
            <span>{method.label}</span>
          </label>
        ))}
      </div>
      <div className="donation">
        <label>
          <input
            type="checkbox"
            onChange={handleChange}
            checked={agreeToDonate}
          />
          <p>{formatMessage(agreeToDonate, tip)}</p>
        </label>
      </div>
      <button className="payment-button">${total}</button>
    </div>
  );
};
