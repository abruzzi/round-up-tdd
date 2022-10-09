import {useState} from "react";

import './payment.css';
import {useRoundUp} from "./useRoundUp";

export const Payment = ({ amount = 0 }: { amount?: number }) => {
  const [agreeToDonate, setAgreeToDonate] = useState<boolean>(false);

  const {tip, total} = useRoundUp(amount, agreeToDonate);

  const handleChange = () => {
    setAgreeToDonate(agree => !agree)
  }

  return (
    <div className="payment-container">
      <h2>Payment</h2>
      <div className="donation">
        <label>
          <input
            type="checkbox"
            checked={agreeToDonate}
            onChange={handleChange}
          />
          <span>{agreeToDonate ? 'Thanks for your donation!': `I'd to donate $${tip} to charity`}</span>
        </label>
      </div>
      <button className="payment-button">${total}</button>
    </div>
  );
};
