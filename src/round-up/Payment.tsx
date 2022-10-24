import { useRoundUp } from "./useRoundUp";
import { useContext } from "react";
import RoundUpStrategyContext from "./RoundUpStrategyContext";
import { RoundUpStrategy } from "./algorithms/RoundUpStrategy";

function formatInputLabel(
  agreeToDonate: boolean,
  strategy: RoundUpStrategy,
  tip: number
) {
  return agreeToDonate
    ? "Thanks for your donation."
    : `I would like to donate ${strategy.getCurrencySign()}${tip} to charity.`;
}

function formatButtonLabel(strategy: RoundUpStrategy, total: number) {
  return `${strategy.getCurrencySign()}${total}`;
}

export const Payment = ({ amount }: { amount: number }) => {
  const { strategy } = useContext(RoundUpStrategyContext);
  const { total, tip, agreeToDonate, updateAgreeToDonate } = useRoundUp(
    amount,
    strategy
  );

  return (
    <div className="container">
      <h3>Payment</h3>
      <label>
        <input
          type="checkbox"
          onChange={() => updateAgreeToDonate()}
          checked={agreeToDonate}
        />
        <p>{formatInputLabel(agreeToDonate, strategy, tip)}</p>
      </label>
      <button>{formatButtonLabel(strategy, total)}</button>
    </div>
  );
};
