import "./Payment.css";
import { usePaymentMethods } from "./usePaymentMethods";

import { PaymentMethods } from "./PaymentMethods";
import { DonationCheckbox } from "./DonationCheckbox";

import { type PaymentStrategy, PaymentStrategyAU } from "./PaymentStrategy";
import { formatButtonLabel, formatCheckboxLabel } from "./utils";
import { useRoundUp } from "./useRoundUp";

export const Payment = ({
  amount,
  strategy = new PaymentStrategyAU(),
}: {
  amount: number;
  strategy?: PaymentStrategy;
}) => {
  const { paymentMethods } = usePaymentMethods();

  const { tip, total, agreeToDonate, updateAgreeToDonate } = useRoundUp(
    amount,
    strategy
  );

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
