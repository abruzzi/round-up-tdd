import { useRoundUp } from "./useRoundUp";

import "./payment.css";
import { formatButtonLabel, formatCheckboxLabel } from "./utils";
import { PaymentMethods } from "./PaymentMethods";
import {CountryCode} from "./types";

export const Payment = ({
  amount,
  methods = [],
  countryCode = "AU",
}: {
  amount: number;
  methods?: string[];
  countryCode?: CountryCode;
}) => {
  const { agreeToDonate, total, tip, updateAgreeToDonate } = useRoundUp(
    amount,
    countryCode
  );

  return (
    <div className="container">
      <h3>Payment</h3>
      <PaymentMethods methods={methods} />
      <div className="donation">
        <label>
          <input
            type="checkbox"
            onChange={updateAgreeToDonate}
            checked={agreeToDonate}
          />
          <p>{formatCheckboxLabel(agreeToDonate, tip, countryCode)}</p>
        </label>
      </div>
      <button className="payment-button">{formatButtonLabel(total, countryCode)}</button>
    </div>
  );
};
