import {useEffect, useState} from "react";

function getRoundUpTotal(amount: number) {
  return Math.floor(amount + 1);
}

function calculateTip(amount: number) {
  return parseFloat((getRoundUpTotal(amount) - amount).toPrecision(10));
}

export const useRoundUp = (amount: number, agreeToDonate: boolean) => {
  const [total, setTotal] = useState<number>(amount);
  const [tip, setTip] = useState<number>(0);

  useEffect(() => {
    setTotal(agreeToDonate ? getRoundUpTotal(amount) : amount);
    setTip(calculateTip(amount));
  }, [agreeToDonate]);

  return {
    tip,
    total
  }
}