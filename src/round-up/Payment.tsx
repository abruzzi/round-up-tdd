import "./Payment.css";
import { usePaymentMethods } from "./usePaymentMethods";

import { PaymentMethods } from "./PaymentMethods";
import { DonationCheckbox } from "./DonationCheckbox";

import { type PaymentStrategy, PaymentStrategyAU } from "./PaymentStrategy";
import { formatButtonLabel, formatCheckboxLabel } from "./utils";
import {useMemo, useState} from "react";

export const Payment = ({
  amount,
  strategy = new PaymentStrategyAU(),
}: {
  amount: number;
  strategy?: PaymentStrategy;
}) => {
  const { paymentMethods } = usePaymentMethods();

  const [agreeToDonate, setAgreeToDonate] = useState<boolean>(false);

  const updateAgreeToDonate = () => {
    setAgreeToDonate((agreeToDonate) => !agreeToDonate);
  };

  const { total, tip } = useMemo(
    () => ({
      total: agreeToDonate ? strategy.getRoundUpAmount(amount) : amount,
      tip: strategy.getTip(amount),
    }),
    [strategy, amount, agreeToDonate]
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
