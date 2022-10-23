import {useRoundUp} from "./useRoundUp";
import {RoundUpStrategy} from "./algorithms/RoundUpStrategy";

type PaymentProps = {
  amount: number;
  strategy: RoundUpStrategy;
};

export const Payment = ({ amount, strategy }: PaymentProps) => {
  const { total, tip, agreeToDonate, updateAgreeToDonate } = useRoundUp(amount, strategy);

  return (
    <div className="container">
      <h3>Payment</h3>
      <label>
        <input
          type="checkbox"
          onChange={() => updateAgreeToDonate()}
          checked={agreeToDonate}
        />
        <p>{agreeToDonate
          ? "Thanks for your donation."
          : `I would like to donate ${strategy.getDollarSign()}${tip} to charity.`}</p>
      </label>
      <button>{`${strategy.getDollarSign()}${total}`}</button>
    </div>
  );
};
