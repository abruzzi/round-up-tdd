import { useState } from "react";
import { useRoundUp } from "./useRoundUp";
import { formatButtonLabel, formatInputLabel } from "./helper";
import { CountryCode } from "./types";

type PaymentProps = {
  amount: number;
  countryCode?: CountryCode;
};

export const Payment = ({ amount, countryCode = "AU" }: PaymentProps) => {
  const [agreeToDonate, setAgreeToDonate] = useState<boolean>(false);
  const { total, tip } = useRoundUp(amount, agreeToDonate, countryCode);

  const handleChange = () => {
    setAgreeToDonate((agreeToDonate) => !agreeToDonate);
  };

  return (
    <div className="container">
      <h3>Payment</h3>
      <label>
        <input
          type="checkbox"
          onChange={handleChange}
          checked={agreeToDonate}
        />
        <p>{formatInputLabel(agreeToDonate, tip, countryCode)}</p>
      </label>
      <button>{formatButtonLabel(countryCode, total)}</button>
    </div>
  );
};
