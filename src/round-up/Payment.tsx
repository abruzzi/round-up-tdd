import "./Payment.css";
import { usePaymentMethods } from "./usePaymentMethods";
import { useRoundUp } from "./useRoundUp";

import { PaymentMethods } from "./PaymentMethods";
import { DonationCheckbox } from "./DonationCheckbox";

import { type PaymentStrategy, PaymentStrategyAU } from "./PaymentStrategy";

const formatCheckboxLabel = (
  agreeToDonate: boolean,
  tip: number,
  strategy: PaymentStrategy
) => {
  const currencySign = strategy.getCurrencySign();
  return agreeToDonate
    ? "Thanks for your donation."
    : `I would like to donate ${currencySign}${tip} to charity.`;
};

const formatButtonLabel = (strategy: PaymentStrategy, total: number) =>
  `${strategy.getCurrencySign()}${total}`;

export const Payment = ({
  amount,
  strategy = new PaymentStrategyAU(),
}: {
  amount: number;
  strategy?: PaymentStrategy;
}) => {
  const { total, tip, agreeToDonate, updateAgreeToDonate } = useRoundUp(
    amount,
    strategy
  );
  const { paymentMethods } = usePaymentMethods();

  return (
    <div className="container">
      <h3>Payment</h3>
      <PaymentMethods paymentMethods={paymentMethods} />
      <DonationCheckbox
        onChange={updateAgreeToDonate}
        checked={agreeToDonate}
        content={formatCheckboxLabel(agreeToDonate, tip, strategy)}
      />
      <button className="paymentButton">
        {formatButtonLabel(strategy, total)}
      </button>
    </div>
  );
};
