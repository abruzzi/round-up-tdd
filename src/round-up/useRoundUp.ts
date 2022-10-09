import {useEffect, useState} from "react";

export const useRoundUp = (amount: number, agreeToDonate: boolean) => {
  const [total, setTotal] = useState(amount);
  const [tip, setTip] = useState<number>(0);

  useEffect(() => {
    const total = Math.floor(amount + 1);
    if (agreeToDonate) {
      setTotal(total);
    } else {
      setTotal(amount);
    }
    setTip(parseFloat((total - amount).toPrecision(10)))
  }, [agreeToDonate]);

  return {
    tip,
    total
  }
}