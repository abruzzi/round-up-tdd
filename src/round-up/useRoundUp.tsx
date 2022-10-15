import {useEffect, useState} from "react";

function calculateRoundUp(amount: number) {
  return Math.floor(amount + 1);
}

function calculateTip(amount: number) {
  return parseFloat((calculateRoundUp(amount) - amount).toPrecision(2));
}

export const useRoundUp = (amount: number, agreeToDonate: boolean) => {
  const [total, setTotal] = useState<number>(amount);
  const [tip, setTip] = useState<number>(0);

  useEffect(() => {
    setTotal(agreeToDonate ? calculateRoundUp(amount) : amount);
    setTip(calculateTip(amount));
  }, [agreeToDonate, amount])

  return {
    total,
    tip
  }
}