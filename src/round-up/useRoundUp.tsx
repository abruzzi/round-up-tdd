import { useMemo, useState} from "react";
import {PaymentStrategy} from "./PaymentStrategy";

export const useRoundUp = (amount: number, strategy: PaymentStrategy) => {
  const [agreeToDonate, setAgreeToDonate] = useState<boolean>(false);

  const pair = useMemo(() => {
      return {
        total: agreeToDonate ? strategy.getRoundUpAmount(amount) : amount,
        tip: strategy.getTip(amount)
      }
  }, [strategy, amount, agreeToDonate]);

  const updateAgreeToDonate = () => {
    setAgreeToDonate((agreeToDonate) => !agreeToDonate);
  };

  return {
    ...pair,
    agreeToDonate,
    updateAgreeToDonate,
  };
};

