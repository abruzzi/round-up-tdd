import { useEffect, useState } from "react";
import { PaymentStrategy } from "../types";

export function useRoundUp(amount: number, strategy: PaymentStrategy) {
  const [agreeToDonate, setRoundUp] = useState<boolean>(false);
  const [total, setTotal] = useState(amount);
  const [tip, setTip] = useState<number>(0);

  useEffect(() => {
    setTotal(agreeToDonate ? strategy.getRoundUpAmount(amount) : amount);
    setTip(strategy.getTip(amount));
  }, [amount, agreeToDonate, strategy]);

  const updateAgreeToDonate = () => {
    setRoundUp((shouldRoundUp) => !shouldRoundUp);
  };
  return { agreeToDonate, total, tip, updateAgreeToDonate };
}