import "./Payment.css";
import { usePaymentMethods } from "../hooks/usePaymentMethods";

import { PaymentMethods } from "./PaymentMethods";
import { DonationCheckbox } from "./DonationCheckbox";

import { type PaymentStrategy } from "../models/PaymentStrategy";
import {formatButtonLabel, formatCheckboxLabel, roundUpToNearestInteger} from "../utils";
import { useRoundUp } from "../hooks/useRoundUp";
import {PaymentStrategyImpl} from "../models/PaymentStrategyImpl";

export const Payment = ({
  amount,
  strategy = new PaymentStrategyImpl("$", roundUpToNearestInteger),
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
