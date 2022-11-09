import { useRoundUp } from "../../hooks/useRoundUp";

import "./payment.css";
import { formatButtonLabel, formatCheckboxLabel } from "../../utils";
import { PaymentMethods } from "../PaymentMethods/PaymentMethods";
import { useContext } from "react";
import {
  PaymentContext,
  PaymentContextType,
} from "../../context/PaymentContext";

export const Payment = ({ amount }: { amount: number }) => {
  const { strategy } = useContext<PaymentContextType>(PaymentContext);
  console.log(strategy);

  const { agreeToDonate, total, tip, updateAgreeToDonate } = useRoundUp(
    amount,
    strategy
  );

  return (
    <div className="container">
      <h3>Payment</h3>
      <PaymentMethods methods={strategy.getPaymentMethods()} />
      <div className="donation">
        <label>
          <input
            type="checkbox"
            onChange={updateAgreeToDonate}
            checked={agreeToDonate}
          />
          <p>{formatCheckboxLabel(agreeToDonate, tip, strategy)}</p>
        </label>
      </div>
      <button className="payment-button">
        {formatButtonLabel(total, strategy)}
      </button>
    </div>
  );
};
