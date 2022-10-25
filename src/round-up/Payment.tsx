import { useRoundUp } from "./useRoundUp";

import "./Payment.css";
import { formatButtonLabel, formatInputLabel } from "./helper";
import RoundUpStrategyContext, {
  RoundUpStrategyContextType,
} from "./RoundUpStrategyContext";
import { useContext } from "react";

export const Payment = ({ amount }: { amount: number }) => {
  const { strategy } = useContext<RoundUpStrategyContextType>(
    RoundUpStrategyContext
  );
  const { total, tip, agreeToDonate, updateAgreeToDonate } = useRoundUp(
    amount,
    strategy
  );

  return (
    <div className="container">
      <h3>Payment</h3>
      <div className="donation">
        <label>
          <input
            type="checkbox"
            onChange={() => updateAgreeToDonate()}
            checked={agreeToDonate}
          />
          <p>{formatInputLabel(agreeToDonate, strategy, tip)}</p>
        </label>
      </div>
      <button className="payment-button">
        {formatButtonLabel(strategy, total)}
      </button>
    </div>
  );
};
