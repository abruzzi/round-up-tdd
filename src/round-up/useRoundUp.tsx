import { useEffect, useState } from "react";
import { CountryCode } from "./types";
import { getCalculateRoundUpFunc, getCalculateTipFunc } from "./helper";

export const useRoundUp = (
  amount: number,
  agreeToDonate: boolean,
  countryCode: CountryCode
) => {
  const [total, setTotal] = useState<number>(amount);
  const [tip, setTip] = useState<number>(0);

  useEffect(() => {
    const calculateRoundUp = getCalculateRoundUpFunc(countryCode);
    const calculateTip = getCalculateTipFunc(countryCode);

    setTotal(agreeToDonate ? calculateRoundUp(amount) : amount);
    setTip(calculateTip(amount));
  }, [agreeToDonate, amount, countryCode]);

  return {
    total,
    tip,
  };
};
