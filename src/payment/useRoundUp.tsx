import {useEffect, useState} from "react";

function calculateRoundUp(amount: number) {
  return Math.floor(amount + 1);
}

function calculateTip(amount: number) {
  return parseFloat((calculateRoundUp(amount) - amount).toPrecision(2));
}

function calculateRoundUpForJP(amount: number) {
  return Math.floor(amount / 100 + 1) * 100;
}

function calculateTipForJP(amount: number) {
  return parseFloat((calculateRoundUpForJP(amount) - amount).toPrecision(2));
}

export function useRoundUp(amount: number, countryCode: string) {
  const [agreeToDonate, setRoundUp] = useState<boolean>(false);
  const [total, setTotal] = useState(amount);
  const [tip, setTip] = useState<number>(0);

  useEffect(() => {
    setTotal(
      agreeToDonate
        ? countryCode === "JP"
          ? calculateRoundUpForJP(amount)
          : calculateRoundUp(amount)
        : amount
    );
    setTip(
      countryCode === "JP" ? calculateTipForJP(amount) : calculateTip(amount)
    );
  }, [amount, agreeToDonate, countryCode]);

  const updateAgreeToDonate = () => {
    setRoundUp(shouldRoundUp => !shouldRoundUp)
  }
  return {agreeToDonate, total, tip, updateAgreeToDonate};
}

