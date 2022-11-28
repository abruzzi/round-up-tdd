import "./Payment.css";
import { usePaymentMethods } from "./usePaymentMethods";
import { useRoundUp } from "./useRoundUp";

import { PaymentMethods } from "./PaymentMethods";
import { DonationCheckbox } from "./DonationCheckbox";

export const Payment = ({ amount }: { amount: number }) => {
  const { total, tipMessage, agreeToDonate, updateAgreeToDonate } =
    useRoundUp(amount);
  const { paymentMethods } = usePaymentMethods();

  return (
    <div className="container">
      <h3>Payment</h3>
      <PaymentMethods paymentMethods={paymentMethods} />
      <DonationCheckbox
        onChange={updateAgreeToDonate}
        checked={agreeToDonate}
        content={tipMessage}
      />
      <button className="paymentButton">${total}</button>
    </div>
  );
};
