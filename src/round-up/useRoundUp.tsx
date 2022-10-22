import { useEffect, useState } from "react";
import { CountryCode } from "./types";
import { calculatorMap } from "./helper";

export const useRoundUp = (
  amount: number,
  agreeToDonate: boolean,
  countryCode: CountryCode
) => {
  const [total, setTotal] = useState<number>(amount);
  const [tip, setTip] = useState<number>(0);

  useEffect(() => {
    const calculator = calculatorMap[countryCode];
    setTotal(agreeToDonate ? calculator.getRoundUp(amount) : amount);
    setTip(calculator.getTip(amount));
  }, [agreeToDonate, amount, countryCode]);

  return {
    total,
    tip,
  };
};
